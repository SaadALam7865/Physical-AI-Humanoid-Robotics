/**
 * Chat page - AI-powered textbook assistant
 */

import React from 'react';
import Layout from '@theme/Layout';
import ChatWidget from '../components/ChatWidget';

export default function ChatPage(): JSX.Element {
  return (
    <Layout
      title="AI Chatbot"
      description="Ask questions about Physical AI and Humanoid Robotics"
    >
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--12">
              <h1 className="hero__title">🤖 AI Textbook Assistant</h1>
              <p className="hero__subtitle">
                Ask me anything about ROS 2, robotics hardware, URDF, sensors,
                or any topic from the Physical AI textbook. I'll provide answers
                grounded in the course material with source citations.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col col--12">
              <ChatWidget />
            </div>
          </div>

          <div className="row margin-top--lg">
            <div className="col col--12">
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--ifm-color-emphasis-100)",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}
              >
                <strong>💡 Tips:</strong>
                <ul style={{ marginBottom: 0, marginTop: "0.5rem" }}>
                  <li>
                    Ask specific questions (e.g., "What is a ROS 2 node?")
                  </li>
                  <li>
                    Request code examples (e.g., "Show me how to create a
                    publisher")
                  </li>
                  <li>
                    Compare concepts (e.g., "Difference between URDF and SDF?")
                  </li>
                  <li>
                    Troubleshoot issues (e.g., "Why is my Gazebo simulation
                    slow?")
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
