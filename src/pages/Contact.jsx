import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />

      {/* FLOATING TEXT */}
      <div className="absolute top-10 left-10 text-gray-700 text-sm tracking-widest animate-pulse">
        ERROR • PAGE • NOT • FOUND
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-[8rem] md:text-[10rem] font-black leading-none bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>

        <p className="mt-4 text-2xl font-semibold">
          You’re offside ⚽
        </p>

        <p className="mt-3 text-gray-400">
          The page you’re looking for doesn’t exist,  
          or it moved to another league.
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-black via-red-700 to-red-600
                       hover:scale-105 transition font-medium"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/matches")}
            className="px-6 py-3 rounded-full border border-red-800
                       hover:bg-red-900/40 transition"
          >
            Watch Sports
          </button>
        </div>
      </div>

      {/* SUBTLE DECOR */}
      <div className="absolute bottom-6 right-6 text-xs text-gray-600">
        © {new Date().getFullYear()} Sports Entertainment
      </div>
    </div>
  );
}
