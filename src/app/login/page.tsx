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
      const res = await axios.post('/api/users/login', user);
      router.push('/profile');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full mt-6 p-3 rounded-lg text-white font-semibold transition duration-300 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
        <div className="text-right mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
