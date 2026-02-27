"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signup = () => {
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
      user.userName.length > 0 &&
      user.email.length > 0 &&
      user.password.length
    ) {
      setDisabled(false);
    }
  }, [user]);

  const onsubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      if (response.data) {
        toast.success("User SignUp successfully.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
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
          SignUp
          <div className="flex gap-2 text-center mt-2 items-center justify-center">
            <label htmlFor="username" className="text-gray-300 w-[30%]">
              Username :{" "}
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Username"
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
          </div>
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
            {isDisabled ? "No SignUp" : "SignUp"}
          </button>
          <div>
            <Link href="/login" className="text-blue-100">
              Login here
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default signup;
