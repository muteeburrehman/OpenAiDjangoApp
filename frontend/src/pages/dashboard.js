// pages/dashboard.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ChatInterface from '@/components/ChatInterface';
import { isAuthenticated } from '@/services/authService';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Head>
        <title>Dashboard - Code Explainer</title>
      </Head>

      <ChatInterface onLogout={handleLogout} />
    </div>
  );
}