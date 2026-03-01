'use client';

import axios from 'axios';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

const Signup = () => {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.userName.trim() && user.email.trim() && user.password.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/signup', user);

      if (response.data) {
        toast.success('Signup successful ');
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] overflow-hidden"
    >
      {/* Floating Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-pink-500 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-cyan-500 opacity-30 blur-3xl rounded-full"></div>

      {/* Glass Card */}
      <div
        className="relative backdrop-blur-2xl bg-white/5 border border-white/10 
                      shadow-[0_0_50px_rgba(139,92,246,0.4)]
                      rounded-3xl p-10 w-full max-w-md transition-all duration-500"
      >
        <h1
          className="text-3xl font-extrabold text-center 
                       bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 
                       bg-clip-text text-transparent mb-8 tracking-wide"
        >
          Create Account 
        </h1>

        <div className="space-y-6">
          <div>
            <label className="text-gray-300 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-2 px-4 py-3 rounded-xl 
                         bg-white/10 border border-white/20 
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         transition-all duration-300"
              onChange={(e) => setUser({...user, userName: e.target.value})}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-2 px-4 py-3 rounded-xl 
                         bg-white/10 border border-white/20 
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-cyan-500
                         transition-all duration-300"
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 px-4 py-3 rounded-xl 
                         bg-white/10 border border-white/20 
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-pink-500
                         transition-all duration-300"
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isDisabled || isLoading}
          className={`w-full mt-8 py-3 rounded-xl font-semibold text-white 
                      transition-all duration-300 ${
                        isDisabled || isLoading
                          ? 'bg-gray-600 cursor-not-allowed opacity-70'
                          : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:scale-102 cursor-pointer hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]'
                      }`}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{' '}
          <Link
            href="/login"
            className="bg-gradient-to-r from-pink-400 to-cyan-400 
                       bg-clip-text text-transparent font-semibold hover:opacity-80"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
