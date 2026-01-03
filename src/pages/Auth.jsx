import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authApi";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data =
        mode === "login"
          ? await login({ email, password })
          : await register({ name, email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-[#3e2c4f]" />

      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl tracking-[0.5em] text-center mb-10">Sport</h1>

          <div className="flex mb-4">
            <button onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full text-black ${mode==="login"?"bg-gray-100":"text-gray-400"}`}>
              Log in
            </button>
            <button onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-full text-black ${mode==="signup"?"bg-gray-100":"text-gray-400"}`}>
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <input
                className="w-full px-4 py-3 mb-3 bg-gray-100 text-black rounded-lg"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            )}

            <input
              className="w-full px-4 py-3 mb-3 bg-gray-100 text-black rounded-lg"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button className="w-full mt-5 py-3 bg-black border border-red-900 text-white rounded-lg hover:bg-red-700">
              {mode === "login" ? "Log in" : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
