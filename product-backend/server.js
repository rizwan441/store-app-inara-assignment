const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const productRoutes = require("./routes/products");
const { seedProducts } = require("./utility/seed");
const { createProductsTable } = require("./utility/dbSetup");



dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// ---- PostgreSQL Connection ----
const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "store",
};

const pool = new Pool(poolConfig);

// Test the connection on startup
pool.connect()
.then(async () => {
    console.log("✅ Connected to PostgreSQL");
    await seedProducts(pool)
    await createProductsTable(pool);   // Create table automatically
; 
  })  .catch((err) => {
    console.error(" Database connection error:", err.message);
    process.exit(1); 
  });

app.locals.pool = pool;

app.use("/api/products", (req, res, next) => {
  req.pool = pool; 
  next();
}, productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
