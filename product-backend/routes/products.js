const express = require("express");
const multer = require("multer");
const pool = require("../db");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) return res.status(400).json({ error: "Image required" });

    const result = await pool.query(
      "INSERT INTO products (name, price, stock, image, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, stock, imageUrl, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    let imageUrl = req.body.existingImage; 
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const result = await pool.query(
      "UPDATE products SET name=$1, price=$2, stock=$3, image=$4, description=$5 WHERE id=$6 RETURNING *",
      [name, price, stock, imageUrl, description, req.params.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
