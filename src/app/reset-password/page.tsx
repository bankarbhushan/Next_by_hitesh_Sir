'use client';

import {useSearchParams} from 'next/navigation';
import {useState} from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword) {
      setIsError(true);
      setMessage('Password is required');
      return;
    }

    try {
      setLoading(true);
      setIsError(false);

      const res = await axios.post('/api/users/resetpassword', {
        token,
        newPassword
      });

      setMessage(res.data.message);
    } catch (error: any) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] px-4">
      {/* Glass Card */}
      <div
        className="relative w-full max-w-md p-8 rounded-3xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      shadow-[0_0_40px_rgba(139,92,246,0.4)]"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
           Reset Password
        </h2>

        {/* Input */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl 
                     bg-white/10 text-white placeholder-gray-400
                     border border-white/20
                     focus:outline-none 
                     focus:ring-2 focus:ring-purple-500
                     focus:border-purple-500
                     transition-all duration-300"
        />

        {/* Button */}
        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full mt-5 py-3 rounded-xl font-semibold text-white
                     transition-all duration-300
                     ${
                       loading
                         ? 'bg-purple-400/50 cursor-not-allowed'
                         : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]'
                     }`}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              isError ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
