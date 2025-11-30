/**
 * ChatWidget - Custom AI-powered textbook assistant.
 *
 * Features:
 * - Ask questions about Physical AI & Robotics
 * - Get RAG-grounded answers with citations
 * - Simple, clean chat interface
 */

import React, { useState, useRef, useEffect } from 'react';
import { apiClient, ChatResponse } from '../../lib/api';
import styles from './styles.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: ChatResponse['sources'];
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hi! I\'m your Physical AI textbook assistant. Ask me anything about ROS 2, robotics, URDF, or any topic from the book!',
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiClient.sendChatMessage(inputValue);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}. Make sure the backend is running at http://localhost:8000`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.messageContent}>
              {message.content}
              {message.sources && message.sources.length > 0 && (
                <div className={styles.sources}>
                  <strong>📚 Sources:</strong>
                  <ul>
                    {message.sources.map((source, idx) => (
                      <li key={idx}>
                        {source.title} - {source.section} ({(source.score * 100).toFixed(0)}% relevant)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.inputForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about ROS 2, URDF, sensors..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isLoading || !inputValue.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
