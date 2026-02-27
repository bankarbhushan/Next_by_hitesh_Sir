'use client';
import axios from 'axios';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('No User');

  const logout = async () => {
    try {
      const res = axios.get('/api/users/logout');
      console.log(res);
      router.push('/login');
    } catch (error) {
      console.log('something went wrong..', error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUserName(res?.data?.data?.userName);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Profile Page </h1>
      <h1>See Your Profile </h1>
      <div>
        <Link
          className={`text-blue-400 ${
            userName === 'No User' ? 'pointer-events-none opacity-50' : ''
          }`}
          href={userName !== 'No User' ? `/profile/${userName}` : '#'}
        >
          {userName}
        </Link>
      </div>
      <button
        onClick={logout}
        className="p-2 m-2 bg-slate-700 rounded-md  text-white cursor-pointer"
      >
        Logout
      </button>
      <button
        onClick={getUserData}
        className="p-2 m-2 bg-orange-700 rounded-md  text-white cursor-pointer"
      >
        Get User
      </button>
    </div>
  );
};
export default Profile;
