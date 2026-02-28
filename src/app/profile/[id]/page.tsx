import React from "react";

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: UserProfileProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
      <h1 className="text-2xl md:text-3xl text-center text-white">
        Hey{" "}
        <span className="p-3 rounded-lg bg-white text-orange-600 font-bold shadow-md">
          {params.id}
        </span>
      </h1>
    </div>
  );
};

export default UserProfile;