'use client';

import axios from 'axios';
import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function VerifyEmail() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');

    if (!urlToken) {
      setStatus('error');
      return;
    }

    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const verifyUserEmail = async () => {
      try {
        await axios.post('/api/users/verifyemail', {token});
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-[#16213e]">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">
        {status === 'loading' && (
          <>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent mb-6">
              Verifying Your Email...
            </h1>

            <div className="mx-auto h-12 w-12 rounded-full border-4 border-[#7873f5] border-t-transparent animate-spin"></div>
          </>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4ADEDE] to-[#5B86E5] bg-clip-text text-transparent mb-4">
              Email Verified
            </h1>

            <p className="text-gray-300 mb-8">
              Your account has been successfully verified.
            </p>

            <Link
              href="/login"
              className="inline-block px-8 py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-[#4ADEDE] to-[#5B86E5]
                         hover:scale-105 hover:shadow-[0_0_20px_rgba(74,222,222,0.6)]
                         transition-all duration-300"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff6ec4] to-[#ff4b2b] bg-clip-text text-transparent mb-4">
              Verification Failed
            </h1>

            <p className="text-gray-300 mb-8">
              Invalid or expired verification link.
            </p>

            <Link
              href="/signup"
              className="inline-block px-8 py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-[#ff6ec4] to-[#ff4b2b]
                         hover:scale-105 hover:shadow-[0_0_20px_rgba(255,110,196,0.6)]
                         transition-all duration-300"
            >
              Sign Up Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
