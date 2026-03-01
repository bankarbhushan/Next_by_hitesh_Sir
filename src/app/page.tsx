import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#0f2027] overflow-hidden">

      {/* Glow Background Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-pink-500 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-cyan-500 opacity-30 blur-3xl rounded-full"></div>

      <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 
                      shadow-[0_0_60px_rgba(139,92,246,0.4)]
                      rounded-3xl p-12 w-full max-w-lg text-center transition-all duration-500">

        <h1 className="text-4xl font-extrabold 
                       bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 
                       bg-clip-text text-transparent mb-6 tracking-wide">
          Auth Learning App 
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          Practice authentication with Next.js App Router.
          Signup, Login, Verify Email & Reset Password.
        </p>

        <div className="flex flex-col gap-5">

          <Link
            href="/signup"
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                       hover:scale-102 cursor-pointer hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]
                       transition-all duration-300"
          >
            Create Account
          </Link>

          <Link
            href="/login"
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-cyan-500 to-blue-500
                       hover:scale-102 cursor-pointer hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]
                       transition-all duration-300"
          >
            Login
          </Link>

          <Link
            href="/forgot-password"
            className="text-sm font-medium 
                       bg-gradient-to-r from-purple-400 to-pink-400
                       bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Forgot Password?
          </Link>

        </div>
      </div>
    </div>
  );
}