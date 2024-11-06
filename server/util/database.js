import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

// Initialize PostgreSQL client with environment variables
const client = new Client({
  user: process.env.PGUSER || "dan",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "hearthstone_db",
  password: process.env.PGPASSWORD || "your_password",
  port: process.env.PGPORT || 5432,
});

async function initializeDatabase() {
  try {
    await client.connect();
    const res = await client.query("SELECT $1::text as message", ["Hello world!"]);
    console.log("Database connected successfully:", res.rows[0].message);
  } catch (err) {
    console.error("Database query error:", err);
  }
}

// Export the client and the initialize function for reuse
export { client, initializeDatabase };
