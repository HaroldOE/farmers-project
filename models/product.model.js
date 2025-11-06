import createConnection from "./db.js";

const db = await createConnection();

// ===== CREATE TABLE =====
export const createProductsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        farmer_id INT,
        crop_type VARCHAR(255),
        quantity DECIMAL(10,2),
        quality VARCHAR(100),
        price DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Products table created successfully");
  } catch (error) {
    console.error("❌ Error creating Products table:", error);
    throw error;
  }
};

// ===== MODEL METHODS =====
export const Product = {
  // CREATE
  async create(data) {
    const { farmer_id, crop_type, quantity, quality, price } = data;
    const [result] = await db.execute(
      `INSERT INTO products (farmer_id, crop_type, quantity, quality, price)
       VALUES (?, ?, ?, ?, ?)`,
      [farmer_id, crop_type, quantity, quality, price]
    );
    return result.insertId;
  },

  // READ ALL
  async findAll() {
    const [rows] = await db.execute(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return rows;
  },

  // READ ONE BY ID
  async findById(product_id) {
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE product_id = ?",
      [product_id]
    );
    return rows[0];
  },

  // UPDATE
  async update(product_id, data) {
    const { farmer_id, crop_type, quantity, quality, price } = data;
    const [result] = await db.execute(
      `UPDATE products
       SET farmer_id = ?, crop_type = ?, quantity = ?, quality = ?, price = ?
       WHERE product_id = ?`,
      [farmer_id, crop_type, quantity, quality, price, product_id]
    );
    return result.affectedRows;
  },

  // DELETE
  async delete(product_id) {
    const [result] = await db.execute(
      "DELETE FROM products WHERE product_id = ?",
      [product_id]
    );
    return result.affectedRows;
  },
};
