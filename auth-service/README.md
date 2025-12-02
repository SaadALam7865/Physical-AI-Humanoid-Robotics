# Authentication Service

Better Auth service for the Physical AI & Humanoid Robotics educational platform.

## Overview

This service provides secure authentication using [Better Auth](https://www.better-auth.com/), a modern authentication framework for TypeScript. It handles user signup, signin, session management, and stores user data in Neon PostgreSQL.

## Features

- **Email/Password Authentication**: Secure user registration and login
- **Session Management**: Persistent sessions with automatic token refresh
- **User Profiles**: Extended user data with educational profile fields
- **Neon PostgreSQL**: Serverless PostgreSQL database integration
- **RESTful API**: Standard HTTP endpoints for auth operations

## Tech Stack

- **Framework**: Better Auth v1.3.4
- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Database**: Neon PostgreSQL (serverless)
- **Server**: Express.js

## Prerequisites

1. **Node.js** >= 20.0.0
2. **Neon PostgreSQL** account and database
3. **npm** or **yarn** package manager

## Installation

### 1. Install Dependencies

```bash
cd auth-service
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Neon PostgreSQL connection string
DATABASE_URL=postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require

# Better Auth secret (min 32 characters)
BETTER_AUTH_SECRET=your-secret-key-min-32-characters-long

# Auth service URL
BETTER_AUTH_URL=http://localhost:3002

# Server port
PORT=3002

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

**Get your Neon connection string:**
1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project
3. Click "Connect"
4. Copy the connection string (ensure `sslmode=require` is included)

### 3. Generate Database Schema

Better Auth CLI will create the necessary database tables:

```bash
npm run generate
```

This creates the schema file. Review it, then run:

```bash
npm run migrate
```

This will create the following tables in your Neon database:
- `user` - User accounts and profiles
- `session` - Active user sessions
- `account` - OAuth account links (if using social auth)
- `verification` - Email verification tokens

## Development

### Start Development Server

```bash
npm run dev
```

The service will start on `http://localhost:3002`.

### Available Endpoints

#### Health Check
```
GET /api/auth/health
```

#### Sign Up
```
POST /api/auth/sign-up/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "organization": "University",
  "role": "student",
  "experienceLevel": "beginner",
  "hasRoboticsBackground": false,
  "hasProgrammingExperience": true
}
```

#### Sign In
```
POST /api/auth/sign-in/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Get Session
```
GET /api/auth/session
Cookie: physical-ai-session=<token>
```

#### Sign Out
```
POST /api/auth/sign-out
Cookie: physical-ai-session=<token>
```

## Database Schema

### User Table

| Column | Type | Description |
|--------|------|-------------|
| id | string | Primary key (UUID) |
| email | string | User email (unique) |
| name | string | Full name |
| emailVerified | boolean | Email verification status |
| image | string | Profile image URL (optional) |
| createdAt | timestamp | Account creation date |
| updatedAt | timestamp | Last update date |
| organization | string | User's organization |
| role | string | User role (student, educator, etc.) |
| experienceLevel | string | Skill level (beginner, intermediate, etc.) |
| interests | string | Comma-separated interests |
| learningGoals | string | User's learning objectives |
| hasRoboticsBackground | boolean | Previous robotics experience |
| hasProgrammingExperience | boolean | Programming experience |

## Production Deployment

### Environment Variables for Production

```env
DATABASE_URL=<production-neon-url>
BETTER_AUTH_SECRET=<strong-secret-key>
BETTER_AUTH_URL=https://auth.yourdomain.com
PORT=3002
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy Options

- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Web service, connect repo
- **Fly.io**: Use `fly launch`
- **Vercel**: Serverless functions
- **AWS Lambda**: Serverless deployment

## Security Considerations

1. **Secret Key**: Use a strong, random secret (min 32 chars)
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Restrict to your frontend domain only
4. **Rate Limiting**: Add rate limiting for production
5. **Password Policy**: Minimum 8 characters enforced
6. **Session Expiry**: 7-day sessions with 1-day refresh

## Troubleshooting

### Database Connection Issues

If you see `connection refused` errors:
1. Verify Neon database is active
2. Check connection string format
3. Ensure SSL mode is enabled (`sslmode=require`)

### Authentication Failures

1. Verify `BETTER_AUTH_SECRET` is set
2. Check `BETTER_AUTH_URL` matches deployment URL
3. Ensure CORS allows your frontend URL

### Schema Migration Issues

1. Run `npm run generate` to create schema
2. Manually review generated SQL
3. Run `npm run migrate` to apply

## Resources

- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Neon PostgreSQL Docs](https://neon.tech/docs)
- [PostgreSQL Adapter](https://www.better-auth.com/docs/adapters/postgresql)

## License

MIT
