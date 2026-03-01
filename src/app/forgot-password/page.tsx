"use client";

import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendLink = async () => {
    if (!email) {
      setIsError(true);
      setMessage("Email is required");
      return;
    }

    try {
      setLoading(true);
      setIsError(false);

      const res = await axios.post("/api/users/forgotpassword", { email });
      setMessage(res.data.message);
    } catch (error: any) {
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] overflow-hidden">

      {/* Glow Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-purple-600 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-cyan-500 opacity-30 blur-3xl rounded-full"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md p-8 rounded-3xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10
                      shadow-[0_0_40px_rgba(139,92,246,0.4)]">

        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
           Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl 
                     bg-white/10 text-white placeholder-gray-400
                     border border-white/20
                     focus:outline-none 
                     focus:ring-2 focus:ring-cyan-500
                     focus:border-cyan-500
                     transition-all duration-300"
        />

        <button
          onClick={handleSendLink}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white
                     transition-all duration-300
                     ${
                       loading
                         ? "bg-purple-400/40 cursor-not-allowed"
                         : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-102 cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                     }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              isError
                ? "text-red-400"
                : "text-emerald-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}