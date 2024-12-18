import { Router } from "express";
import {
  checkCredentialsSignup,
  checkCredentialsLogin,
  checkUserExist,
  checkEmail,
} from "../middleware/userValidation.js";
import { createUser } from "../database/userRepository.js";
import { hashPassword } from "../util/passwordUtils.js";
import { autenticateUser } from "../middleware/userAuthentication.js";



const router = Router();

router.post(
  "/api/v1/signup",
  checkCredentialsSignup,
  checkUserExist,
  checkEmail,
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await hashPassword(password);
      const result = await createUser(username, email, hashedPassword);
      if (result.status === "success") {
        req.flash("success", "Signup successful!"); // Set flash message
        return res.redirect("/");
      } else {
        return res.status(500).send({ data: result.error });
      }
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).send({ data: "Signup failed" });
    }
  },
);

router.post(
  "/api/v1/login",
  checkCredentialsLogin,
  autenticateUser,
  async (req, res) => {
    try {
      req.session.userId = req.userId;
      req.session.username = req.body.username; // Save username in session
      return res.status(200).json({ success: true, username: req.body.username, redirectUrl: "/" });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).send({ data: "Login failed" });
    }
  }
);

router.get("/api/v1/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send({ data: "Failed to logout" });
    }
    res.redirect("/"); // Redirect to homepage after logout
  });
});

export default router;