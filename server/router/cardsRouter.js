import express from "express";
import { client } from "../util/database.js"; // Use the shared client from database.js

const router = express.Router();

// Route to fetch card data
router.get("/api/tests", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM hearthstone_cards WHERE card_set = 'Battlegrounds' LIMIT 1000"
    );
    res.json(result.rows); // Send result as JSON
  } catch (error) {
    console.error("Error fetching card data:", error);
    res.status(500).json({ error: "Failed to fetch card data" });
  }
});

// Route to add a card to a user's profile
router.post("/api/add-card", async (req, res) => {
  const { cardId } = req.body;
  const userId = req.session.userId; // Retrieve user ID from session

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  try {
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
  }
});

export default router;
