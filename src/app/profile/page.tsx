'use client';

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUserName(res?.data?.data?.userName);
    } catch (error: any) {
      console.log(error.message);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0c29]">
        <div className="text-white text-xl animate-pulse tracking-wider">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] overflow-hidden">
      {/* Glow Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-600 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-cyan-500 opacity-30 blur-3xl rounded-full"></div>

      {/* Glass Card */}
      <div
        className="relative w-full max-w-md p-8 rounded-3xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10
                      shadow-[0_0_40px_rgba(139,92,246,0.4)]
                      text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
          Welcome 👋
        </h1>

        <p className="text-gray-300 mb-6">This is your profile dashboard</p>

        {userName && (
          <Link
            href={`/profile/${userName}`}
            className="block text-lg font-semibold mb-6 
                       bg-gradient-to-r from-purple-400 to-cyan-400 
                       bg-clip-text text-transparent hover:opacity-80 transition"
          >
            @{userName}
          </Link>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={logout}
            className="px-5 py-2 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-red-500 to-pink-500
                       hover:scale-105 hover:shadow-[0_0_20px_rgba(244,63,94,0.7)]
                       transition-all duration-300"
          >
            Logout
          </button>

          <button
            onClick={getUserData}
            className="px-5 py-2 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-purple-500 to-cyan-500
                       hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]
                       transition-all duration-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
