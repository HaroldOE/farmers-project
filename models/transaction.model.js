import createConnection from "./db.js";

const db = await createConnection();

export const createTransactionTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        transaction_id INT AUTO_INCREMENT PRIMARY KEY,
        farmer_id INT,
        buyer_id INT,
        amount DECIMAL(10,2),
        status VARCHAR(100),
        date DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("Transactions table created successfully");
  } catch (error) {
    console.error("An error occurred creating the table:", error);
    throw error;
  }
};

export const Transaction = {
  // Create
  async create(data) {
    const { farmer_id, buyer_id, amount, status, date } = data;
    const [result] = await db.execute(
      `INSERT INTO transactions (farmer_id, buyer_id, amount, status, date)
       VALUES (?, ?, ?, ?, ?)`,
      [farmer_id, buyer_id, amount, status, date]
    );
    return result.insertId;
  },

  // Get all
  async findAll() {
    const [rows] = await db.execute(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );
    return rows;
  },

  // Get by ID
  async findById(transaction_id) {
    const [rows] = await db.execute(
      "SELECT * FROM transactions WHERE transaction_id = ?",
      [transaction_id]
    );
    return rows[0];
  },

  // Update
  async update(transaction_id, data) {
    const { farmer_id, buyer_id, amount, status, date } = data;
    const [result] = await db.execute(
      `UPDATE transactions
       SET farmer_id = ?, buyer_id = ?, amount = ?, status = ?, date = ?
       WHERE transaction_id = ?`,
      [farmer_id, buyer_id, amount, status, date, transaction_id]
    );
    return result.affectedRows;
  },

  // Delete
  async delete(transaction_id) {
    const [result] = await db.execute(
      "DELETE FROM transactions WHERE transaction_id = ?",
      [transaction_id]
    );
    return result.affectedRows;
  },
};
