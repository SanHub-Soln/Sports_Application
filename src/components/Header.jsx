import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const logout = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (!confirm) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const goToFavorites = () => {
    navigate("/matches", { state: { tab: "favorites" } });
    setOpen(false);
  };

  return (
    <header className="relative flex items-center px-6 py-4 shadow">

      {/* LEFT : LOGO */}
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
        LOGO
      </h1>

      {/* CENTER : NAV */}
      <nav className="absolute left-1/2 -translate-x-1/2  flex gap-10 text-white">
        {["Home", "Matches", "Contact"].map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="relative group font-medium text-white"
          >
            {item}
            {/* underline animation */}
            <span
              className="absolute left-0 -bottom-1 h-[2px] w-0 text-white
                         transition-all duration-300 group-hover:w-full"
            />
          </Link>
        ))}
      </nav>

      {/* RIGHT : AUTH / PROFILE */}
      <div className="ml-auto relative" ref={dropdownRef}>
        {!user ? (
          <Link
            to="/auth"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Login
          </Link>
        ) : (
          <>
            {/* PROFILE AVATAR */}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-yellow-900 text-white flex items-center justify-center"
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-medium bg-[linear-gradient(120deg,#ff0080,#7928ca,#2afadf)]
            bg-[length:200%_200%]
            animate-gradient
            bg-clip-text text-transparent">{user.name}</p>
                  <p className="text-sm text-black">{user.email}</p>
                </div>

                <button
                  onClick={goToFavorites}
                  className="text-black w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ❤️ Favorites
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
