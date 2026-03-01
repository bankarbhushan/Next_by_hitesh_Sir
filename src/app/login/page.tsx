'use client';

import axios from 'axios';
import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');
      await axios.post('/api/users/login', user);
      router.push('/profile');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] overflow-hidden"
    >
      {/* Glow Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-purple-600 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-cyan-500 opacity-30 blur-3xl rounded-full"></div>

      {/* Glass Card */}
      <div
        className="relative w-full max-w-md p-8 rounded-3xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10
                      shadow-[0_0_40px_rgba(139,92,246,0.4)]"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Welcome Back 
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/30">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-xl 
                         bg-white/10 text-white placeholder-gray-400
                         border border-white/20
                         focus:outline-none 
                         focus:ring-2 focus:ring-purple-500
                         focus:border-purple-500
                         transition-all duration-300"
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-xl 
                         bg-white/10 text-white placeholder-gray-400
                         border border-white/20
                         focus:outline-none 
                         focus:ring-2 focus:ring-cyan-500
                         focus:border-cyan-500
                         transition-all duration-300"
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white
                     transition-all duration-300
                     ${
                       isLoading
                         ? 'bg-purple-400/40 cursor-not-allowed'
                         : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-102 cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]'
                     }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="bg-gradient-to-r from-purple-400 to-cyan-400 
                       bg-clip-text text-transparent font-semibold hover:opacity-80"
          >
            Sign up
          </Link>
        </p>

        <div className="text-right mt-3">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
