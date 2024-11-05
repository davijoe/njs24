import { homepagePage, cardsPage, chatPage } from "../util/readPages.js";

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

// Chat page
router.get("/api/chat", (req, res) => {
  res.send(chatPage);
})

export default router;
