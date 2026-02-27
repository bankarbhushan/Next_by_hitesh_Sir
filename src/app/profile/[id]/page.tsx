import React from "react";

const UserProfile = async ({ params }: any) => {
  const user = await params;
  return (
    <div>
      <h1 className="text-2xl text-center mt-5">
        Hey{" "}
        <span className="p-2 rounded-md bg-orange-400 mt-5 ">{user.id}</span>
      </h1>
    </div>
  );
};
export default UserProfile;
