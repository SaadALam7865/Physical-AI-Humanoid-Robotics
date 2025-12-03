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
} from "./profile-service.js";

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [config.frontendUrl, "http://localhost:3000"];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.warn(`⚠️ CORS Blocked Origin: ${origin}`);
    console.log(`   Allowed Origins: ${allowedOrigins.join(", ")}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(cors(corsOptions));

// Handle OPTIONS preflight for all routes explicitly (sometimes helps with strict proxies)
app.options("*", cors(corsOptions));

// Root endpoint for Railway health check
app.get("/", (_req, res) => {
  res.json({
    status: "healthy",
    service: "auth-service",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/api/auth/health", (_req, res) => {
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
        session: (signupResponse as any).session || null,
      });
    }

    return res.json(signupResponse);
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({
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
    return res.json(profile);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Update user profile
app.put("/api/auth/profile/:userId", async (req, res) => {
  try {
    const profile = await updateUserProfile(req.params.userId, req.body);
    return res.json(profile);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Better Auth endpoints
// All auth routes will be available at /api/auth/*
app.all("/api/auth/*", toNodeHandler(auth));

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    return res.status(500).json({
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// Start server
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Auth service started on port ${PORT}`);
  console.log(`Health check available at: http://0.0.0.0:${PORT}/`);
  console.log(`Auth API available at: http://0.0.0.0:${PORT}/api/auth/*`);
});
