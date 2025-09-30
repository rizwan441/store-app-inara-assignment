const defaultProducts = [
  {
    name: "Laptop",
    price: 1200.50,
    stock: 10,
    image: "laptop.jpg",
    description: "High-performance laptop",
  },
  {
    name: "Smartphone",
    price: 800.00,
    stock: 25,
    image: "smartphone.jpg",
    description: "Latest model smartphone",
  },
   {
    name: "Laptop",
    price: 1200.50,
    stock: 10,
    image: "laptop.jpg",
    description: "High-performance laptop",
  },
  {
    name: "Smartphone",
    price: 800.00,
    stock: 25,
    image: "smartphone.jpg",
    description: "Latest model smartphone",
  },
   {
    name: "Laptop",
    price: 1200.50,
    stock: 10,
    image: "laptop.jpg",
    description: "High-performance laptop",
  },
  {
    name: "Smartphone",
    price: 800.00,
    stock: 25,
    image: "smartphone.jpg",
    description: "Latest model smartphone",
  },
   {
    name: "Laptop",
    price: 1200.50,
    stock: 10,
    image: "laptop.jpg",
    description: "High-performance laptop",
  },
  // ➕ Add up to 15 total items here following the same pattern
];

async function seedProducts(pool) {
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM products");
    if (parseInt(rows[0].count, 10) === 0) {
      for (const product of defaultProducts) {
        await pool.query(
          `INSERT INTO products (name, price, stock, image, description)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            product.name,
            product.price,
            product.stock,
            product.image,
            product.description,
          ]
        );
      }
      console.log("✅ Default products inserted.");
    } else {
      console.log("ℹ️ Products table already has data, skipping seed.");
    }
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  }
}

module.exports = { seedProducts };
