import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.REACT_APP_API_URL_CONTACT ||
    "http://localhost:5000/api/contact";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API_URL, form);

      if (response.status === 200 || response.status === 201) {
        alert("Message Sent Successfully!");
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.error || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Contact{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Me
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Have a project, DevOps requirement, monitoring setup, or MERN
              application idea? Send me a message and I will connect with you.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <h3 className="font-bold text-cyan-400">DevOps</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Docker, Kubernetes, CI/CD, AWS
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <h3 className="font-bold text-cyan-400">SRE</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Monitoring, RCA, Alerts, Reliability
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Name
                </label>
                <input
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
                  placeholder="Enter your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email
                </label>
                <input
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition resize-none"
                  placeholder="How can I help?"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 px-6 py-3 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;