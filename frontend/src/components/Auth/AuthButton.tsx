import React from 'react';
import { useAuth } from './AuthContext';
import { authClient } from '@/lib/auth-client';

const AuthButton: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (user) {
    return (
      <button 
        className="navAuthButton navLogin" 
        onClick={handleLogout}
        style={{ cursor: 'pointer' }}
      >
        Log Out
      </button>
    );
  }

  return (
    <a 
      href="/auth" 
      className="navAuthButton navLogin"
      style={{ textDecoration: 'none' }}
    >
      Sign In
    </a>
  );
};

export default AuthButton;
