import createConnection from "./db.js";

const db = await createConnection();

export const createFamersTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS farmers(
        farmers_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        crops    VARCHAR(255),
        location     VARCHAR(255),
        rate     decimal(2,1),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    )`;
    console.log(" farmers table created successfully");
    
  } catch (error) {
    console.error("an error occured creating farmers table ", error);
    throw error;
  }
};
 

export const createUser = async (users) => {
    try {
        const {name, crop, location, rate} = users;
        const query = `INSERT INTO users (name, crop, location, rate) VALUES(?,?,?,?)`;
        const hashedpassword = bcrypt.hash(password, 10);
        await db.query(query, [name, crop, location, rate]);
        console.log("user created successfully");
    } catch (error) {
        console.error("an error occured creating user", users);
        throw error;
    }
};  