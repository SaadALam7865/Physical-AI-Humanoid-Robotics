# Authentication Implementation Guide

Complete guide for setting up and using authentication in the Physical AI & Humanoid Robotics platform.

## Architecture Overview

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│                 │      │                  │      │                 │
│   Frontend      │─────>│  Auth Service    │─────>│  Neon PostgreSQL│
│   (Docusaurus)  │      │  (Better Auth)   │      │                 │
│                 │      │                  │      │                 │
└─────────────────┘      └──────────────────┘      └─────────────────┘
     Port 3000                Port 3002                  Cloud
```

### Components

1. **Frontend (Docusaurus)**: React-based UI with auth components
2. **Auth Service**: Node.js/Express service running Better Auth
3. **Database**: Neon PostgreSQL for user data storage

## Setup Instructions

### Step 1: Set Up Neon PostgreSQL Database

1. **Create Account**: Go to [neon.tech](https://neon.tech) and sign up

2. **Create Project**:
   - Click "Create Project"
   - Name: `physical-ai-auth`
   - Region: Choose closest to your users

3. **Get Connection String**:
   - Click on your project
   - Navigate to "Connection Details"
   - Copy the connection string
   - Format: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`

4. **Store Connection String**:
   ```bash
   # In auth-service/.env
   DATABASE_URL=postgresql://your-connection-string
   ```

### Step 2: Install and Configure Auth Service

1. **Navigate to auth service**:
   ```bash
   cd auth-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create .env file**:
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your values**:
   ```env
   DATABASE_URL=<your-neon-connection-string>
   BETTER_AUTH_SECRET=$(openssl rand -base64 32)  # Generate secure key
   BETTER_AUTH_URL=http://localhost:3002
   PORT=3002
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. **Generate database schema**:
   ```bash
   npm run generate
   ```
   This creates the SQL schema file.

6. **Migrate database** (creates tables):
   ```bash
   npm run migrate
   ```

   Confirm when prompted. This creates:
   - `user` table
   - `session` table
   - `account` table
   - `verification` table

7. **Start auth service**:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   🚀 Auth service running on http://localhost:3002
   📚 Auth API available at http://localhost:3002/api/auth
   ```

### Step 3: Configure Frontend

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   This installs `better-auth` v1.3.4 (already added to package.json)

3. **Create .env.local file**:
   ```bash
   cp .env.example .env.local
   ```

4. **Update .env.local**:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
   REACT_APP_AUTH_URL=http://localhost:3002
   ```

5. **Start frontend**:
   ```bash
   npm start
   ```

   Frontend runs on `http://localhost:3000`

### Step 4: Add Auth to Docusaurus

1. **Create auth route** in `frontend/src/pages/auth.tsx`:
   ```tsx
   import React from 'react';
   import Layout from '@theme/Layout';
   import { AuthPage } from '@/components/Auth';

   export default function Auth() {
     return (
       <Layout title="Sign In" description="Authenticate to access content">
         <AuthPage />
       </Layout>
     );
   }
   ```

2. **Add UserButton to navbar** - Edit `docusaurus.config.ts`:
   ```typescript
   import { UserButton } from '@/components/Auth';

   // In navbar items, add:
   {
     type: 'custom',
     value: <UserButton />,
     position: 'right',
   }
   ```

## Usage Examples

### Frontend: Sign Up a User

```tsx
import { authClient } from '@/lib/auth-client';

const handleSignUp = async () => {
  const { data, error } = await authClient.signUp.email({
    email: "student@university.edu",
    password: "SecurePass123",
    name: "Jane Doe",
    // Additional profile fields
    organization: "MIT",
    role: "student",
    experienceLevel: "intermediate",
    hasRoboticsBackground: true,
    hasProgrammingExperience: true,
    learningGoals: "Learn humanoid locomotion and manipulation"
  });

  if (error) {
    console.error("Signup failed:", error);
  } else {
    console.log("User created:", data.user);
  }
};
```

### Frontend: Sign In a User

```tsx
import { authClient } from '@/lib/auth-client';

const handleSignIn = async () => {
  const { data, error } = await authClient.signIn.email({
    email: "student@university.edu",
    password: "SecurePass123"
  });

  if (error) {
    console.error("Sign in failed:", error);
  } else {
    console.log("Logged in:", data.user);
  }
};
```

### Frontend: Get Current User

```tsx
import { authClient } from '@/lib/auth-client';

const getCurrentUser = async () => {
  const session = await authClient.getSession();

  if (session?.data?.user) {
    console.log("Current user:", session.data.user);
    console.log("Organization:", session.data.user.organization);
    console.log("Experience:", session.data.user.experienceLevel);
  } else {
    console.log("No user logged in");
  }
};
```

### Frontend: Sign Out

```tsx
import { authClient } from '@/lib/auth-client';

const handleSignOut = async () => {
  await authClient.signOut();
  window.location.href = '/';
};
```

## User Profile Fields

### Default Better Auth Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique user ID |
| email | string | User email |
| name | string | Full name |
| image | string | Avatar URL (optional) |
| emailVerified | boolean | Verification status |
| createdAt | Date | Account creation |
| updatedAt | Date | Last updated |

### Custom Profile Fields (Questionnaire)

| Field | Type | Options | Description |
|-------|------|---------|-------------|
| organization | string | - | School/Company |
| role | string | student, researcher, educator, professional, hobbyist, other | User type |
| experienceLevel | string | beginner, intermediate, advanced, expert | Skill level |
| interests | string | - | Comma-separated topics |
| learningGoals | string | - | Free text goals |
| hasRoboticsBackground | boolean | - | Previous experience |
| hasProgrammingExperience | boolean | - | Coding skills |

## Database Queries (Direct Access)

If you need to query users directly from the backend:

```python
# backend/app/services/user_service.py
import psycopg2
import os

def get_user_profile(user_id: str):
    conn = psycopg2.connect(os.getenv("NEON_DATABASE_URL"))
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, email, name, organization, role,
               experience_level, has_robotics_background
        FROM user
        WHERE id = %s
    """, (user_id,))

    user = cursor.fetchone()
    cursor.close()
    conn.close()

    return user
```

## Testing the Setup

### 1. Test Auth Service Health

```bash
curl http://localhost:3002/api/auth/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "auth-service",
  "timestamp": "2025-12-02T10:30:00.000Z"
}
```

### 2. Test Signup via API

```bash
curl -X POST http://localhost:3002/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "name": "Test User",
    "role": "student",
    "experienceLevel": "beginner"
  }'
```

### 3. Test Database Connection

```bash
# In auth-service directory
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
pool.query('SELECT NOW()', (err, res) => {
  console.log(err ? err : res.rows[0]);
  pool.end();
});
"
```

## Environment Variables Reference

### Auth Service (.env)

```env
# Required
DATABASE_URL=postgresql://...                # Neon connection string
BETTER_AUTH_SECRET=<min-32-chars>           # Auth secret key
BETTER_AUTH_URL=http://localhost:3002       # Service URL
FRONTEND_URL=http://localhost:3000          # Frontend URL for CORS

# Optional
PORT=3002                                   # Server port
NODE_ENV=development                        # Environment
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000  # FastAPI backend
REACT_APP_AUTH_URL=http://localhost:3002        # Auth service
```

### Backend (.env)

```env
# Add to existing backend/.env
NEON_DATABASE_URL=postgresql://...          # Same as auth service
AUTH_SERVICE_URL=http://localhost:3002      # For backend-to-auth calls
```

## Production Deployment

### Auth Service Deployment

1. **Railway**:
   ```bash
   railway login
   railway init
   railway add postgresql  # Or link to Neon
   railway up
   ```

2. **Render**:
   - Create new Web Service
   - Connect GitHub repo
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Add environment variables

3. **Update Production URLs**:
   ```env
   BETTER_AUTH_URL=https://auth.yourdomain.com
   FRONTEND_URL=https://yourdomain.com
   ```

### Frontend Deployment

Update `.env.production`:
```env
REACT_APP_AUTH_URL=https://auth.yourdomain.com
```

## Troubleshooting

### "Connection refused" to auth service

**Cause**: Auth service not running or wrong port

**Fix**:
```bash
cd auth-service
npm run dev
```

### "Invalid session" errors

**Cause**: Cookie not being set or wrong domain

**Fix**:
1. Check `BETTER_AUTH_URL` matches your domain
2. Ensure cookies are enabled in browser
3. Check CORS settings in auth service

### Database migration fails

**Cause**: Connection string incorrect or DB not accessible

**Fix**:
1. Verify connection string in `.env`
2. Test connection: `psql $DATABASE_URL`
3. Ensure Neon project is active

### TypeScript errors in frontend

**Cause**: Missing type definitions

**Fix**:
```bash
cd frontend
npm install @types/react @types/react-dom
```

## Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` templates
2. **Use strong secrets** - Minimum 32 characters, random
3. **Enable HTTPS** in production
4. **Restrict CORS** to your domain only
5. **Set secure cookie flags** in production
6. **Implement rate limiting** on auth endpoints
7. **Enable email verification** for production
8. **Use environment-specific configs**

## Next Steps

1. ✅ Set up authentication system
2. 🔄 Add email verification (optional)
3. 🔄 Implement password reset flow
4. 🔄 Add social login (Google, GitHub)
5. 🔄 Create protected routes in frontend
6. 🔄 Add role-based access control
7. 🔄 Implement user profile page

## Resources

- [Better Auth Docs](https://www.better-auth.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Docusaurus Authentication](https://docusaurus.io/docs/advanced/client)

---

**Need Help?** Check the [Better Auth Discord](https://discord.gg/better-auth) or [create an issue](https://github.com/better-auth/better-auth/issues).
