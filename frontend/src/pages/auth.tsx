import React from 'react';
import Layout from '@theme/Layout';
import { AuthPage } from '../components/Auth';

export default function Auth() {
  return (
    <Layout
      title="Sign In"
      description="Sign in or create an account to access the Physical AI & Humanoid Robotics platform"
    >
      <AuthPage />
    </Layout>
  );
}
