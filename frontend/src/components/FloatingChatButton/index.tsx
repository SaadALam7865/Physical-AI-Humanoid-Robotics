/**
 * FloatingChatButton - Floating chat button that appears on all pages
 */

import React, { useState } from 'react';
import ChatWidget from '../ChatWidget';
import styles from './styles.module.css';

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className={styles.floatingChatWindow}>
          <div className={styles.chatHeader}>
            <h3>AI Assistant</h3>
            <button className={styles.closeButton} onClick={toggleChat}>
              ✕
            </button>
          </div>
          <div className={styles.chatContent}>
            <ChatWidget />
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          className={styles.floatingButton}
          onClick={toggleChat}
          aria-label="Open AI chat assistant"
          title="Ask AI Assistant"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </>
  );
};

export default FloatingChatButton;
