// pages/_app.js
import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/services/authService';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authRequired = !['/', '/login', '/register'].includes(router.pathname);

    if (authRequired && !isAuthenticated()) {
      router.push('/login');
    }
    setLoading(false);  // ✅ Fix: Ensure loading is turned off in all cases
  }, [router.pathname]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
