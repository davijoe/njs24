import connection from "./connection.js";
import { hashPassword } from "../util/passwordUtils.js";

(async () => {
  await createUsersTable();
  await insertUserData();
})();

export async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_role VARCHAR(10) CHECK (user_role IN ('normal', 'admin')) NOT NULL
    );`;

  try {
    await connection.query(createTableQuery);
    console.log("Users table created successfully.");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

export async function insertUserData() {
  const sql =
    "INSERT INTO users (username, email, password, user_role) VALUES ($1,$2,$3,$4);";

  try {
    await connection.query(sql, [
      "Admin",
      "admin@example.com",
      hashPassword("adminpassword"),
      "admin",
    ]);
    console.log("Admin user inserted into users table");

    await connection.query(sql, [
      "doeyjohn",
      "john.doe@example.com",
      hashPassword("password123"),
      "normal",
    ]);

    await connection.query(sql, [
      "Janethesane",
      "jane.smith@example.com",
      hashPassword("password456"),
      "normal",
    ]);

    console.log("Data inserted into users table");
  } catch (err) {
    console.error("Error inserting user data: ", err);
  }
}
