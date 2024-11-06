import express from "express";
import pkg from "pg";

const { Client } = pkg;

const router = express.Router();

// Route to fetch card data
router.get("/api/tests", async (req, res) => {
  const client = new Client({
    user: process.env.PGUSER || "dan",
    host: process.env.PGHOST || "localhost",
    database: process.env.PGDATABASE || "hearthstone_db",
    password: process.env.PGPASSWORD || "your_password",
    port: process.env.PGPORT || 5432,
  });

  try {
    await client.connect(); // Connec db
    const result = await client.query(
      "select * from hearthstone_cards where card_set='Battlegrounds' limit 1000",
    );
    res.json(result.rows); // res as json
  } catch (error) {
    console.error("Error fetching card data:", error);
    res.status(500).json({ error: "Failed to fetch card data" });
  } finally {
    await client.end(); // close after query
  }
});

router.post("/api/add-card", async (req, res) => {
  const { cardId } = req.body;
  const userId = req.session.userId; // Check for user session

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  const client = new Client({
    user: process.env.PGUSER || "dan",
    host: process.env.PGHOST || "localhost",
    database: process.env.PGDATABASE || "hearthstone_db",
    password: process.env.PGPASSWORD || "your_password",
    port: process.env.PGPORT || 5432,
  });

  try {
    await client.connect();

    // Insert card to user_cards table if it doesn't already exist
    const query = `
      INSERT INTO user_cards (user_id, card_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `;
    await client.query(query, [userId, cardId]);
    res.json({ success: true, message: "Card added to profile." });
  } catch (error) {
    console.error("Error adding card to profile:", error);
    res.status(500).json({ error: "Failed to add card to profile" });
  } finally {
    await client.end();
  }
});

export default router;
