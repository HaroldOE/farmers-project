import createConnection from "./db.js";

const db = await createConnection();

export const Farmer = {
  // Create
  async create(data) {
    const { name, location, phone, crops, rating } = data;
    const [result] = await db.execute(
      `INSERT INTO farmers (name, location, phone, crops, rating)
       VALUES (?, ?, ?, ?, ?)`,
      [name, location, phone, crops, rating]
    );
    return result.insertId;
  },

  // Get all
  async findAll() {
    const [rows] = await db.execute(
      "SELECT * FROM farmers ORDER BY created_at DESC"
    );
    return rows;
  },

  // Get by ID
  async findById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM farmers WHERE farmer_id = ?",
      [id]
    );
    return rows[0];
  },

  // Update
  async update(id, data) {
    const { name, location, phone, crops, rating } = data;
    const [result] = await db.execute(
      `UPDATE farmers 
       SET name = ?, location = ?, phone = ?, crops = ?, rating = ?
       WHERE farmer_id = ?`,
      [name, location, phone, crops, rating, id]
    );
    return result.affectedRows;
  },

  // Delete
  async delete(id) {
    const [result] = await db.execute(
      "DELETE FROM farmers WHERE farmer_id = ?",
      [id]
    );
    return result.affectedRows;
  },
};
