import createConnection from "./db.js";

const db = await createConnection();

export const createMarketPriceTable = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS market_prices(
        id INT AUTO_INCREMENT PRIMARY KEY,
        crop_type VARCHAR(255),
        market    VARCHAR(255),
        price     decimal(10,2),
        date      datetime,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     )`);
    console.log("market price table created successfully");
  } catch (error) {
    console.error("an error occured creating table ", error);
    throw error;
  }
};

export const MarketPrice = {
  // Create
  async create(data) {
    const { crop_type, market, price, date } = data;
    const [result] = await db.execute(
      `INSERT INTO market_prices (crop_type, market, price, date)
       VALUES (?, ?, ?, ?)`,
      [crop_type, market, price, date]
    );
    return result.insertId;
  },

  // Get all
  async findAll() {
    const [rows] = await db.execute(
      "SELECT * FROM market_prices ORDER BY created_at DESC"
    );
    return rows;
  },

  // Get by ID
  async findById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM market_prices WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Update
  async update(id, data) {
    const { crop_type, market, price, date } = data;
    const [result] = await db.execute(
      `UPDATE market_prices 
       SET crop_type = ?, market = ?, price = ?, date = ?
       WHERE id = ?`,
      [crop_type, market, price, date, id]
    );
    return result.affectedRows;
  },

  // Delete
  async delete(id) {
    const [result] = await db.execute(
      "DELETE FROM market_prices WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  },
};
