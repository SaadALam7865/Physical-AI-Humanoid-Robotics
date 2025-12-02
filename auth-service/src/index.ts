/**
 * Express server for Better Auth service.
 *
 * Handles authentication endpoints for signup, signin, and session management.
 */

import { config } from "./config.js";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  type CreateProfileData,
} from "./profile-service.js";

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  }),
);

// Health check endpoint
app.get("/api/auth/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "auth-service",
    timestamp: new Date().toISOString(),
  });
});

// Custom signup endpoint that creates both user and profile
app.post("/api/auth/signup-with-profile", async (req, res) => {
  try {
    const { email, password, name, ...profileData } = req.body;

    // First, create user with better-auth
    const signupResponse = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!signupResponse || !signupResponse.user) {
      return res.status(400).json({ error: "User creation failed" });
    }

    // Then create profile if profile data provided
    if (Object.keys(profileData).length > 0) {
      const profile = await createUserProfile({
        user_id: signupResponse.user.id,
        ...profileData,
      });

      return res.json({
        user: signupResponse.user,
        profile,
        session: signupResponse.session,
      });
    }

    return res.json(signupResponse);
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Signup failed",
      message: error.message,
    });
  }
});

// Get user profile
app.get("/api/auth/profile/:userId", async (req, res) => {
  try {
    const profile = await getUserProfile(req.params.userId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
app.put("/api/auth/profile/:userId", async (req, res) => {
  try {
    const profile = await updateUserProfile(req.params.userId, req.body);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Better Auth endpoints
// All auth routes will be available at /api/auth/*
app.all("/api/auth/*", toNodeHandler(auth));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  },
);

// Start server
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log("Auth service started");
});
