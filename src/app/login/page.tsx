"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onsubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res);
      router.push("/profile");
    } catch (error) {
      console.log("something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center animate-pulse mt-48">Loading...</div>
      ) : (
        <div className="text-2xl text-center w-fit m-auto text-blue-100 mt-10 border-1 border-gray-300 rounded-md p-2">
          Login
          <div className="flex gap-2 text-center items-center mt-2 justify-center">
            <label htmlFor="email" className="text-gray-300 w-[30%]">
              Email :{" "}
            </label>
            <input
              type="email"
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex gap-2 text-center items-center mt-2 justify-center">
            <label htmlFor="password" className="text-gray-300 w-[30%]">
              Password :{" "}
            </label>
            <input
              type="password"
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 mt-4 text-white rounded-md p-2"
            onClick={onsubmit}
          >
            Login
          </button>
          <div>
            <Link href="/signup" className="text-blue-100">
              SignUp here
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
