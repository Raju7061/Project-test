const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;