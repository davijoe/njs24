import { homepagePage } from "../util/readPages.js";

import { Router } from "express";
const router = Router();

// Homepage
router.get("/", (req, res) => {
  res.send(homepagePage);
});

// Cards page
router.get("/api/cards", (req, res) => {
  res.send(cardsPage);
});

export default router;
