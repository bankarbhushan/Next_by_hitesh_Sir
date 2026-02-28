"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (!urlToken) {
      setStatus("error");
      return;
    }

    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-700 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 text-center">

        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent mx-auto"></div>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Email Verified ✅
            </h1>
            <p className="text-gray-600 mb-6">
              Your account has been successfully verified.
            </p>
            <Link
              href="/login"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Verification Failed ❌
            </h1>
            <p className="text-gray-600 mb-6">
              Invalid or expired verification link.
            </p>
            <Link
              href="/signup"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sign Up Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}