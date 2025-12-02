# 🚀 FINAL SETUP STEPS - Authentication System

## ✅ What's Fixed

1. **Docusaurus Config Error** - Fixed JSX syntax error at line 116
2. **Two Separate Tables** - Created proper database schema:
   - `user` table → email & password (managed by better-auth)
   - `user_profile` table → questionnaire answers
3. **Sign In/Sign Up Buttons** - Added to navbar, link to `/auth` page
4. **Complete Auth Flow** - Signup, signin, profile storage

## 🏃 Quick Start (3 Steps)

### Step 1: Setup Auth Service Database

```bash
cd auth-service

# Generate better-auth tables
npm run migrate
# Type 'yes' when prompted

# Create user_profile table
# Go to https://console.neon.tech/ → SQL Editor
# Run the SQL from: auth-service/src/db-setup.sql
```

**Or use psql:**
```bash
psql "postgresql://neondb_owner:npg_BE7bLgpjWu9T@ep-proud-boat-adl9y0le-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f src/db-setup.sql
```

### Step 2: Start Auth Service

```bash
cd auth-service
npm run dev
```

✅ Should see: `🚀 Auth service running on http://localhost:3002`

### Step 3: Start Frontend

```bash
cd frontend
npm start
```

✅ Should see: Docusaurus running on `http://localhost:3000`

## 🧪 Test the System

### Test 1: Health Check
```bash
curl http://localhost:3002/api/auth/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "auth-service"
}
```

### Test 2: Sign Up with Profile
```bash
curl -X POST http://localhost:3002/api/auth/signup-with-profile \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.com",
    "password": "Password123",
    "name": "Test Student",
    "organization": "Test University",
    "role": "student",
    "experience_level": "beginner",
    "has_robotics_background": false,
    "has_programming_experience": true,
    "learning_goals": "Learn ROS 2 and humanoid robotics"
  }'
```

Should return user + profile data!

### Test 3: Frontend UI

1. Go to http://localhost:3000
2. Click **"Sign Up"** button in navbar
3. Fill out the form (2 steps)
4. Submit → Should create account!

## 📊 Database Structure

### Table 1: `user` (Credentials)
```sql
CREATE TABLE "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL,
  "createdAt" timestamptz DEFAULT CURRENT_TIMESTAMP
);
```

### Table 2: `account` (Password Storage)
```sql
CREATE TABLE "account" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id"),
  "password" text,  -- Hashed with scrypt
  "providerId" text NOT NULL  -- 'credential' for email/password
);
```

### Table 3: `user_profile` (Questionnaire)
```sql
CREATE TABLE user_profile (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
  organization TEXT,
  role TEXT,
  experience_level TEXT,
  interests TEXT,
  learning_goals TEXT,
  has_robotics_background BOOLEAN DEFAULT FALSE,
  has_programming_experience BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 How Data is Stored

### When User Signs Up:

**Input:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "organization": "MIT",
  "role": "student",
  "experience_level": "intermediate",
  "has_robotics_background": true,
  "has_programming_experience": true
}
```

**Stored in `user` table:**
```
id: "abc123xyz"
email: "john@example.com"
name: "John Doe"
emailVerified: false
```

**Stored in `account` table:**
```
id: "acc_xyz"
userId: "abc123xyz"
password: "$scrypt$..." (hashed)
providerId: "credential"
```

**Stored in `user_profile` table:**
```
id: "prof_123"
user_id: "abc123xyz"
organization: "MIT"
role: "student"
experience_level: "intermediate"
has_robotics_background: true
has_programming_experience: true
```

## 🎯 Accessing User Data

### Get User Credentials
```typescript
// Using better-auth
const session = await authClient.getSession();
console.log(session.user.email);  // john@example.com
console.log(session.user.name);   // John Doe
```

### Get User Profile (Questionnaire)
```typescript
// Using custom API
import { getUserProfile } from '@/lib/auth-client';

const profile = await getUserProfile(userId);
console.log(profile.organization);        // MIT
console.log(profile.role);                // student
console.log(profile.experience_level);    // intermediate
```

### Combined Data
```typescript
const session = await authClient.getSession();
const profile = await getUserProfile(session.user.id);

// Now you have:
// - session.user → email, name, id (from user table)
// - profile → organization, role, goals (from user_profile table)
```

## 🔐 Login Check

```typescript
// Check if user is logged in
const session = await authClient.getSession();

if (session?.user) {
  // User is logged in
  console.log("Logged in as:", session.user.email);

  // Get their profile
  const profile = await getUserProfile(session.user.id);
  console.log("Role:", profile.role);
} else {
  // User not logged in
  window.location.href = '/auth';
}
```

## 🎨 UI Components

### Navbar Buttons
- **Sign In** button → `/auth` page (shows login tab)
- **Sign Up** button → `/auth` page (shows signup tab)

### Auth Page (`/auth`)
- Tab 1: **Sign In** (email + password)
- Tab 2: **Sign Up** (2-step form with questionnaire)

### Step 1: Account Info
- Name
- Email
- Password

### Step 2: Profile Details
- Organization
- Role (student, researcher, educator, etc.)
- Experience Level (beginner, intermediate, advanced, expert)
- Robotics Background (checkbox)
- Programming Experience (checkbox)
- Learning Goals (textarea)

## 📁 File Structure

```
auth-service/
├── src/
│   ├── auth.ts              ✅ Better Auth config
│   ├── index.ts             ✅ Express server + custom endpoints
│   ├── profile-service.ts   ✅ CRUD for user_profile table
│   └── db-setup.sql         ✅ SQL to create user_profile table
├── .env                     ✅ Your credentials (DATABASE_URL, etc.)
└── package.json             ✅ Dependencies

frontend/
├── src/
│   ├── components/Auth/
│   │   ├── SignUpForm.tsx   ✅ Multi-step signup with profile
│   │   ├── SignInForm.tsx   ✅ Login form
│   │   ├── AuthPage.tsx     ✅ Combined auth page
│   │   └── UserButton.tsx   ✅ User avatar dropdown
│   ├── pages/
│   │   └── auth.tsx         ✅ /auth route
│   ├── lib/
│   │   └── auth-client.ts   ✅ Auth functions
│   └── css/
│       └── auth.css         ✅ Auth button styles
└── docusaurus.config.ts     ✅ FIXED - added Sign In/Sign Up buttons
```

## ⚡ Troubleshooting

### "Cannot find module '@/lib/auth-client'"

Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### "CORS error"

Check `auth-service/.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### "Table user_profile does not exist"

Run the SQL from `auth-service/src/db-setup.sql` in Neon SQL Editor.

## ✨ You're Done!

Now you have:
- ✅ Two separate tables (user + user_profile)
- ✅ Sign In / Sign Up buttons in navbar
- ✅ Complete authentication flow
- ✅ Profile questionnaire storage
- ✅ Working auth system

**Test it now:**
1. Go to http://localhost:3000
2. Click **Sign Up**
3. Fill the form
4. Submit!

Your data will be split between:
- `user` table → email, password (hashed)
- `user_profile` table → questionnaire answers

Both linked by `user_id`! 🎉
