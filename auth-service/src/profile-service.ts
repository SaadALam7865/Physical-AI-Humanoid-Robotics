/**
 * User Profile Service
 *
 * Handles CRUD operations for user_profile table
 */

import { Pool } from "pg";
import { config } from "./config.js";

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export interface UserProfile {
  id: string;
  user_id: string;
  organization?: string;
  role?: string;
  experience_level?: string;
  interests?: string;
  learning_goals?: string;
  has_robotics_background?: boolean;
  has_programming_experience?: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProfileData {
  user_id: string;
  organization?: string;
  role?: string;
  experience_level?: string;
  interests?: string;
  learning_goals?: string;
  has_robotics_background?: boolean;
  has_programming_experience?: boolean;
}

/**
 * Create a new user profile
 */
export async function createUserProfile(data: CreateProfileData): Promise<UserProfile> {
  const query = `
    INSERT INTO public.user_profile (
      user_id, organization, role, experience_level, interests,
      learning_goals, has_robotics_background, has_programming_experience
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    data.user_id,
    data.organization || null,
    data.role || 'student',
    data.experience_level || 'beginner',
    data.interests || null,
    data.learning_goals || null,
    data.has_robotics_background || false,
    data.has_programming_experience || false,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Get user profile by user_id
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const query = `SELECT * FROM public.user_profile WHERE user_id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0] || null;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: Partial<CreateProfileData>
): Promise<UserProfile> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'user_id' && value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  });

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(userId);
  const query = `
    UPDATE public.user_profile
    SET ${fields.join(', ')}
    WHERE user_id = $${paramIndex}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Delete user profile
 */
export async function deleteUserProfile(userId: string): Promise<void> {
  await pool.query('DELETE FROM public.user_profile WHERE user_id = $1', [userId]);
}
