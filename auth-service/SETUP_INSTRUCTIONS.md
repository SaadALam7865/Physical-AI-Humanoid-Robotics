# Auth Service Setup - Step by Step

## What You Need to Do NOW

### 1. Generate Secret Key

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and replace the BETTER_AUTH_SECRET in your `.env` file.

### 2. Run Better Auth Migration

First, generate the schema:
```bash
cd auth-service
npm run generate
```

This will update the migration file. Then run:
```bash
npm run migrate
```

Type `yes` when asked. This creates the `user`, `session`, `account`, and `verification` tables.

### 3. Create User Profile Table

Run this SQL in your Neon console or using psql:

```bash
# Option 1: Using psql
psql "postgresql://neondb_owner:npg_BE7bLgpjWu9T@ep-proud-boat-adl9y0le-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f src/db-setup.sql

# Option 2: Copy SQL from src/db-setup.sql and run in Neon SQL Editor
```

Go to: https://console.neon.tech/ → Your Project → SQL Editor
Paste and run the contents of `src/db-setup.sql`.

### 4. Start Auth Service

```bash
npm run dev
```

Should see:
```
🚀 Auth service running on http://localhost:3002
📚 Auth API available at http://localhost:3002/api/auth
🏥 Health check at http://localhost:3002/api/auth/health
```

### 5. Test It

```bash
# Health check
curl http://localhost:3002/api/auth/health

# Test signup with profile
curl -X POST http://localhost:3002/api/auth/signup-with-profile \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123",
    "name": "Test User",
    "organization": "Test University",
    "role": "student",
    "experience_level": "beginner",
    "has_robotics_background": false,
    "has_programming_experience": true
  }'
```

You should get a response with `user` and `profile` objects!

## Database Tables Created

### Table 1: `user` (Better Auth - credentials)
- id (PK)
- email (unique)
- name
- emailVerified
- image
- createdAt
- updatedAt

### Table 2: `account` (Better Auth - password storage)
- id (PK)
- userId (FK to user.id)
- password (hashed with scrypt)
- providerId (set to 'credential' for email/password)

### Table 3: `session` (Better Auth - active sessions)
- id (PK)
- userId (FK to user.id)
- token (unique)
- expiresAt
- ipAddress
- userAgent

### Table 4: `user_profile` (CUSTOM - questionnaire data)
- id (PK)
- user_id (FK to user.id, UNIQUE)
- organization
- role
- experience_level
- interests
- learning_goals
- has_robotics_background
- has_programming_experience
- created_at
- updated_at

## How It Works

1. **Signup Flow**:
   - POST to `/api/auth/signup-with-profile`
   - Creates user in `user` table (better-auth)
   - Stores hashed password in `account` table (better-auth)
   - Creates profile in `user_profile` table (custom)
   - Returns both user and profile data

2. **Login Flow**:
   - POST to `/api/auth/sign-in/email`
   - Verifies password (better-auth)
   - Creates session in `session` table
   - Returns session cookie

3. **Get Profile**:
   - GET `/api/auth/profile/:userId`
   - Returns questionnaire data from `user_profile` table

## Frontend Integration

The frontend (Docusaurus) will:
1. Show Sign In / Sign Up buttons in navbar
2. Navigate to `/auth` page
3. Display signup form with questionnaire
4. Call `signUpWithProfile()` function
5. Store session cookie
6. Fetch profile data when needed

## Next Steps

✅ Run the migration (step 2)
✅ Create user_profile table (step 3)
✅ Start auth service (step 4)
✅ Test signup (step 5)
Then start the frontend!
