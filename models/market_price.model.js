import createConnection from "./db.js";

const db = await createConnection();

export const createAdminTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS market_prices(
        id INT AUTO_INCREMENT PRIMARY KEY,
        crop_type VARCHAR(255),
        market    VARCHAR(255),
        price     decimal(10,2),
        date      datetime,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    )`;
    console.log("market price table created successfully");
  } catch (error) {
    console.error("an error occured creating table ", error);
    throw error;
  }
};
