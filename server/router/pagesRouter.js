import { homepagePage, cardsPage, chatPage, testPage, profilePage } from "../util/readPages.js";

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

// Test page
router.get("/api/test", (req, res) => {
  res.send(testPage)
})

// Profile page
router.get("/api/v1/profile", (req, res) => {
  const username = req.session.username;
  
  if (!username) {
     return res.status(401).redirect("/");
  }
  res.send(profilePage);
});

export default router;