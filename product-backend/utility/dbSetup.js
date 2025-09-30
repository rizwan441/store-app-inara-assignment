async function createProductsTable(pool) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price NUMERIC(10,2) NOT NULL CHECK (price > 0),
      stock INT NOT NULL CHECK (stock >= 0),
      image TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("✅ Products table is ready.");
  } catch (err) {
    console.error("❌ Error creating products table:", err.message);
  }
}

module.exports = { createProductsTable };
