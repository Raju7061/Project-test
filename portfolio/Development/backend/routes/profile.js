const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* Multer Storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"));
    }
  },
});

/* GET PROFILE */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, email, profile_image
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("PROFILE FETCH ERROR:", err);
    res.status(500).json({ error: "Profile fetch failed" });
  }
});

/* UPLOAD PROFILE IMAGE */
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      const result = await pool.query(
        `UPDATE users
         SET profile_image = $1
         WHERE id = $2
         RETURNING id, username, email, profile_image`,
        [imageUrl, req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "Profile image updated successfully",
        user: result.rows[0],
        profile_image: imageUrl,
      });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: "Profile image upload failed" });
    }
  }
);

/* ERROR HANDLER */
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === "Only image files allowed") {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Something went wrong" });
});

module.exports = router;