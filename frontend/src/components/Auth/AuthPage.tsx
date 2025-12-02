/**
 * AuthPage component - handles authentication flow with tabs for signin/signup.
 */

/**
 * AuthPage component - Standalone page version of the AuthModal
 * Uses the same styling and logic as the modal for consistency.
 */

import React, { useState } from 'react';
import OnboardingWizard, { UserProfile as WizardProfile } from './OnboardingWizard';
import { authClient, signUpWithProfile, type SignupData } from '@/lib/auth-client';
import styles from './styles.module.css';

export const AuthPage: React.FC = () => {
  const [view, setView] = useState<'login' | 'signup' | 'onboarding'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password
      });

      if (error) {
        setError(error.message || 'Login failed');
      } else {
        // Redirect to home/docs on success
        window.location.href = "/docs/part-1-foundations-lab/chapter-1-embodied-ai";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setError(null);
    setView('onboarding');
  };

  const handleOnboardingComplete = async (profileData: WizardProfile) => {
    setLoading(true);
    setError(null);

    try {
      const signupPayload: SignupData = {
        email,
        password,
        name,
        experience_level: profileData.experience,
        has_programming_experience: profileData.language !== 'none',
        interests: `Hardware: ${profileData.hardware}, OS: ${profileData.os}`,
        learning_goals: profileData.goal === 'builder' ? 'Build a robot' : 'Academic study',
        role: 'student'
      };

      await signUpWithProfile(signupPayload);
      
      // Redirect to home/docs on success
      window.location.href = "/docs/part-1-foundations-lab/chapter-1-embodied-ai";
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} style={{ position: 'relative', minHeight: '80vh', background: 'transparent' }}>
      <div className={styles.modalContent}>
        {/* No close button needed for page version */}

        {view === 'login' && (
          <>
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Log in to access your personalized lab.</p>
            
            {error && <div style={{ color: '#ff4d4d', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="pilot@robotics.lab"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input 
                  type="password" 
                  className={styles.input} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.primaryButton} disabled={loading}>
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <p className={styles.switchMode}>
              Don't have an account? 
              <button className={styles.link} onClick={() => { setError(null); setView('signup'); }}>Sign Up</button>
            </p>
          </>
        )}

        {view === 'signup' && (
          <>
            <h2 className={styles.title}>Initialize System</h2>
            <p className={styles.subtitle}>Create your pilot profile.</p>
            
            {error && <div style={{ color: '#ff4d4d', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

            <form className={styles.form} onSubmit={handleSignupStep1}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Name</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="Ace Pilot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="pilot@robotics.lab"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input 
                  type="password" 
                  className={styles.input} 
                  placeholder="Create a secure key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <button type="submit" className={styles.primaryButton}>Next: Personalize</button>
            </form>

            <p className={styles.switchMode}>
              Already have an account? 
              <button className={styles.link} onClick={() => { setError(null); setView('login'); }}>Sign In</button>
            </p>
          </>
        )}

        {view === 'onboarding' && (
          <div style={{ position: 'relative' }}>
             {loading && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.5)', zIndex: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                  Creating Account...
                </div>
             )}
            <OnboardingWizard onComplete={handleOnboardingComplete} />
          </div>
        )}
      </div>
    </div>
  );
};
