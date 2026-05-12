import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth/register"; 

  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Signup failed"); return; }
      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      alert("Server error.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-950 text-white">
      <form onSubmit={handleSignup} className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Join Us
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-cyan-500 text-slate-950 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 transform hover:-translate-y-1 transition-all shadow-lg shadow-cyan-500/20">
            Get Started
          </button>
        </div>

        <p className="text-slate-400 mt-8 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-cyan-400 font-bold cursor-pointer hover:text-cyan-300 transition-colors"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;