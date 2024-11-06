import express from "express";
import pkg from "pg";

const { Client } = pkg;

// Initialize PostgreSQL client
const client = new Client({
  user: process.env.PGUSER || "dan",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "hearthstone_db",
  password: process.env.PGPASSWORD || "your_password",
  port: process.env.PGPORT || 5432,
});

const router = express.Router();

// Route to fetch card data
router.get("/api/tests", async (req, res) => {
  try {
    await client.connect(); // Connect to the database
    const result = await client.query(
      "select * from hearthstone_cards where card_set='Battlegrounds' limit 5000",
    );
    res.json(result.rows); // Send the result as JSON
  } catch (error) {
    console.error("Error fetching card data:", error);
    res.status(500).json({ error: "Failed to fetch card data" });
  } finally {
    await client.end(); // Close the connection after the query
  }
});

export default router;
