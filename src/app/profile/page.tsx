"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserName(res?.data?.data?.userName);
    } catch (error: any) {
      console.log(error.message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="text-white text-xl animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome 👋
        </h1>

        <p className="text-gray-600 mb-6">
          This is your profile dashboard.
        </p>

        {userName && (
          <Link
            href={`/profile/${userName}`}
            className="block text-indigo-600 font-semibold text-lg mb-6 hover:underline"
          >
            @{userName}
          </Link>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition active:scale-95"
          >
            Logout
          </button>

          <button
            onClick={getUserData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition active:scale-95"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;