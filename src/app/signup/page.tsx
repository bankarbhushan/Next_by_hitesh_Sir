"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      user.userName.trim() &&
      user.email.trim() &&
      user.password.trim()
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);

      if (response.data) {
        toast.success("Signup successful 🎉");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-700 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              onChange={(e) =>
                setUser({ ...user, userName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isDisabled || isLoading}
          className={`w-full mt-6 p-3 rounded-lg text-white font-semibold transition duration-300 ${
            isDisabled || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 active:scale-95"
          }`}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;