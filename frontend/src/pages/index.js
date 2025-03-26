// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Login from '@/components/Login';
import ChatInterface from '@/components/ChatInterface';
import { isAuthenticated } from '@/services/authService';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on load
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Head>
        <title>Code Explainer</title>
        <meta name="description" content="Code explanation using ChatGPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!authenticated ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <ChatInterface onLogout={handleLogout} />
      )}
    </div>
  );
}