# Quick Start: Authentication Setup

Fast-track guide to get authentication running in 5 minutes.

## Prerequisites Checklist

- [ ] Node.js 20+ installed
- [ ] npm installed
- [ ] Neon PostgreSQL account created
- [ ] Git repository cloned

## Step-by-Step Setup

### 1. Get Neon Database URL (2 minutes)

1. Go to https://console.neon.tech/
2. Create new project: `physical-ai-auth`
3. Click **Connect** → Copy connection string
4. Should look like: `postgresql://user:pass@host.neon.tech/db?sslmode=require`

### 2. Set Up Auth Service (2 minutes)

```bash
# Navigate to auth service
cd auth-service

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add:
# - DATABASE_URL=<your-neon-connection-string>
# - BETTER_AUTH_SECRET=$(openssl rand -base64 32)

# Generate and migrate database
npm run generate
npm run migrate  # Type 'yes' when prompted

# Start auth service
npm run dev
```

✅ Auth service should be running on http://localhost:3002

### 3. Set Up Frontend (1 minute)

```bash
# Navigate to frontend
cd frontend

# Install dependencies (includes better-auth)
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add:
# REACT_APP_AUTH_URL=http://localhost:3002

# Start frontend
npm start
```

✅ Frontend should be running on http://localhost:3000

### 4. Test Authentication

**Quick API Test:**
```bash
# Health check
curl http://localhost:3002/api/auth/health

# Sign up test user
curl -X POST http://localhost:3002/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "name": "Test User",
    "role": "student"
  }'
```

**Browser Test:**
1. Go to http://localhost:3000/auth
2. Click "Sign Up" tab
3. Fill form and submit
4. Should see success message and redirect

## Environment Variables Needed

### auth-service/.env
```env
DATABASE_URL=postgresql://...           # From Neon
BETTER_AUTH_SECRET=<32-char-random>     # Generate with openssl
BETTER_AUTH_URL=http://localhost:3002
PORT=3002
FRONTEND_URL=http://localhost:3000
```

### frontend/.env.local
```env
REACT_APP_AUTH_URL=http://localhost:3002
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

## Verify Everything Works

### ✅ Checklist

- [ ] Auth service health check returns 200
- [ ] Can sign up new user via API
- [ ] Can sign in via API
- [ ] Frontend /auth page loads
- [ ] Can sign up via UI
- [ ] Can sign in via UI
- [ ] User icon appears when logged in
- [ ] Can sign out

## Common Issues

### Port already in use
```bash
# Kill process on port 3002
lsof -ti:3002 | xargs kill -9  # Mac/Linux
# Or change PORT in auth-service/.env
```

### Database connection failed
- Check connection string has `?sslmode=require`
- Verify Neon project is active
- Test connection: `psql $DATABASE_URL`

### CORS errors
- Ensure `FRONTEND_URL` in auth .env matches frontend URL
- Check browser console for specific CORS error

## What Was Created

### Auth Service
```
auth-service/
├── src/
│   ├── auth.ts          # Better Auth config
│   └── index.ts         # Express server
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── .env                 # Your secrets (DO NOT COMMIT)
```

### Frontend Components
```
frontend/src/
├── lib/
│   └── auth-client.ts   # Auth client
└── components/Auth/
    ├── SignUpForm.tsx   # Multi-step signup
    ├── SignInForm.tsx   # Login form
    ├── UserButton.tsx   # Avatar dropdown
    └── AuthPage.tsx     # Combined auth page
```

### Database Tables Created
- `user` - User accounts with profile data
- `session` - Active sessions
- `account` - OAuth connections
- `verification` - Email verification tokens

## User Profile Fields

When signing up, users can provide:
- ✅ Email & Password (required)
- ✅ Name (required)
- ✅ Organization (optional)
- ✅ Role (student, researcher, educator, etc.)
- ✅ Experience Level (beginner to expert)
- ✅ Robotics Background (yes/no)
- ✅ Programming Experience (yes/no)
- ✅ Learning Goals (free text)

## Next Steps

1. **Customize UI**: Edit components in `frontend/src/components/Auth/`
2. **Add Protected Routes**: Check auth in Docusaurus pages
3. **Email Verification**: Enable in `auth-service/src/auth.ts`
4. **Social Login**: Add Google/GitHub OAuth
5. **Deploy**: See AUTHENTICATION_GUIDE.md for deployment

## Need Help?

- 📖 Full Guide: See `AUTHENTICATION_GUIDE.md`
- 🔧 Auth Service: See `auth-service/README.md`
- 🌐 Better Auth Docs: https://www.better-auth.com/docs
- 💾 Neon Docs: https://neon.tech/docs

## Working?

If everything is set up correctly, you should be able to:

1. Open http://localhost:3000/auth
2. Sign up with a new account
3. See the user icon in the top right
4. Click the icon to see profile menu
5. Sign out successfully

🎉 **Authentication is now live!**
