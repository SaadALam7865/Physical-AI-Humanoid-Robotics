import { config } from "./config.js";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function initDb() {
  console.log("🔌 Connecting to:", config.databaseUrl?.substring(0, 20) + "...");
  
  try {
    // 1. Create user_profile table
    console.log("🔨 Creating table 'user_profile'...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.user_profile (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL UNIQUE REFERENCES "public"."user"(id) ON DELETE CASCADE,
        organization TEXT,
        role TEXT,
        experience_level TEXT,
        interests TEXT,
        learning_goals TEXT,
        has_robotics_background BOOLEAN DEFAULT FALSE,
        has_programming_experience BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log("✅ Table 'user_profile' created (or already exists).");

    // 2. Create Index
    console.log("🔨 Creating index...");
    await pool.query(`
      CREATE INDEX IF NOT EXISTS user_profile_user_id_idx ON public.user_profile(user_id);
    `);
    console.log("✅ Index created.");
    
    // 3. Verify
    const result = await pool.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_profile';
    `);
    
    if (result.rows.length > 0) {
      console.log("🎉 VERIFICATION SUCCESS: Table 'user_profile' was found in the database!");
    } else {
      console.error("❌ VERIFICATION FAILED: Table was not found even after creation.");
    }

  } catch (err) {
    console.error("❌ Error initializing database:", err);
  } finally {
    await pool.end();
  }
}

initDb();
