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
  checkEmail,
  autenticateUser,
  async (req, res) => {
    try {
      req.session.userId = req.userId;
      return res.status(200).send({ data: "Login Successful" });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).send({ data: "Login failed" });
    }
  },
);

export default router;