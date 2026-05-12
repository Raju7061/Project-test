const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* =========================
   CORS CONFIG
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://raju.local",
      "http://raju.local",
    ],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   STATIC FOLDER
========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   ROUTES
========================= */

// Auth
app.use("/api/auth", require("./routes/auth"));

// Contact
app.use("/api/contact", require("./routes/contact"));

// Messages
app.use("/api/messages", require("./routes/messages"));

// Profile
app.use("/api/profile", require("./routes/profile"));

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("✅ Portfolio Backend is Healthy and Running");
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    error: "Something went wrong on the server!",
    message: err.message,
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🚀 API Base URL: http://localhost:${PORT}/api`);
});