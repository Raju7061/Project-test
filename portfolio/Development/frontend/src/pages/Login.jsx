import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api/auth"; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Login failed"); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      alert("Cannot connect to server.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-950 text-white">
      <form onSubmit={handleLogin} className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-cyan-500 text-slate-950 py-4 rounded-xl font-bold hover:bg-cyan-400 transform hover:-translate-y-1 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            Sign In
          </button>
        </div>

        <p className="text-slate-400 mt-8 text-center text-sm">
          New here?{" "}
          <span
            className="text-cyan-400 font-bold cursor-pointer hover:text-cyan-300 transition-colors"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;