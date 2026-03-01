import React from "react";
import Link from "next/link";
export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] px-4">
      <div
        className="items-center w-full max-w-md p-8 rounded-3xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      shadow-[0_0_40px_rgba(139,92,246,0.4)]"
      >
        <h1 className="text-3xl font-semibold text-center text-white">
          Welcome 👋
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {id.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="mt-6 px-6 w-full text-center py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold">
          {id}
        </div>
        <Link
          className="text-blue-500 hover:text-blue-600 text-center block mt-6 font-bold"
          href="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
