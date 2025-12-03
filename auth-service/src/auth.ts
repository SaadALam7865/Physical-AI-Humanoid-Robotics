/**
 * Better Auth configuration for Physical AI & Humanoid Robotics platform.
 *
 * This module configures authentication with:
 * - Email/password authentication
 * - Neon PostgreSQL database storage
 * - Separate user_profile table for questionnaire data
 */

import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { config } from "./config.js";

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  // Database configuration
  database: pool,

  // Trusted Origins (Fixes "Invalid origin" error)
  trustedOrigins: [config.frontendUrl, "http://localhost:3000"],

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true, // Auto sign in after successful signup
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Security configuration
  secret: config.betterAuthSecret!,
  baseURL: config.betterAuthUrl,

  // Advanced configuration
  advanced: {
    cookiePrefix: "physical-ai",
    useSecureCookies: config.nodeEnv === "production",
  },
});
