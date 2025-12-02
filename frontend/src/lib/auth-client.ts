/**
 * Better Auth client for frontend authentication.
 *
 * This client provides methods for:
 * - User signup with email/password
 * - User signin
 * - Session management
 * - User profile access
 */

import { createAuthClient } from "better-auth/react";

const AUTH_URL = process.env.REACT_APP_AUTH_URL || "http://localhost:3002";

// Define the auth client with configuration
export const authClient = createAuthClient({
  baseURL: AUTH_URL,
});

/**
 * User profile interface (separate table)
 */
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

/**
 * Extended user type with basic auth fields
 */
export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Signup data interface
 */
export interface SignupData {
  email: string;
  password: string;
  name: string;
  // Optional profile fields (stored in user_profile table)
  organization?: string;
  role?: string;
  experience_level?: string;
  interests?: string;
  learning_goals?: string;
  has_robotics_background?: boolean;
  has_programming_experience?: boolean;
}

/**
 * Sign in data interface
 */
export interface SignInData {
  email: string;
  password: string;
}

/**
 * Custom signup with profile creation
 */
export async function signUpWithProfile(data: SignupData) {
  const response = await fetch(`${AUTH_URL}/api/auth/signup-with-profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }

  return response.json();
}

/**
 * Get user profile by user ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const response = await fetch(`${AUTH_URL}/api/auth/profile/${userId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  const response = await fetch(`${AUTH_URL}/api/auth/profile/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
}
