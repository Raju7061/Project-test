import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL_MESSAGES ||
    "http://localhost:5000/api/messages";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(API_URL);
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Unable to load messages. Please check backend or Elasticsearch.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [API_URL]);

  const formatDate = (value) => {
    if (!value) return "No date";

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      const normalDate = new Date(value);
      return Number.isNaN(normalDate.getTime())
        ? "Invalid date"
        : normalDate.toLocaleString();
    }

    const timestamp =
      numberValue > 9999999999999 ? numberValue / 1000 : numberValue;

    const date = new Date(timestamp);

    return Number.isNaN(date.getTime())
      ? "Invalid date"
      : date.toLocaleString();
  };

  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Elasticsearch Inbox
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Contact{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Messages
              </span>
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Messages synced from backend and Elasticsearch using a
              production-style data pipeline.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-8 py-6 text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400"></div>
                <p className="text-slate-300 font-medium">
                  Loading messages...
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="max-w-2xl mx-auto rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
              <p className="text-red-300 font-semibold">{error}</p>
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center">
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                No messages found
              </h3>
              <p className="text-slate-400">
                Elasticsearch has no contact messages yet.
              </p>
            </div>
          )}

          {!loading && !error && messages.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {messages.map((msg, index) => (
                <article
                  key={msg.id || index}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-cyan-400 transition">
                        {msg.name || "Unknown User"}
                      </h2>

                      <p className="text-sm text-cyan-400 mt-1 break-all">
                        {msg.email || "No email provided"}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                      {formatDate(msg.created_at)}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                    “{msg.message || "No message"}”
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Messages;