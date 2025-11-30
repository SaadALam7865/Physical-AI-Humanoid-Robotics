/**
 * Root wrapper - Adds global components to all pages
 */

import React from 'react';
import FloatingChatButton from '../components/FloatingChatButton';

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      {children}
      <FloatingChatButton />
    </>
  );
}
