import { getUserByEmail } from "../database/userRepository.js";

export function checkCredentialsSignup(req, res, next) {
  req.body.username = req?.body.username?.trim();
  req.body.email = req?.body.email.trim();
  req.body.password = req?.body.password?.trim();

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send("Please provide a username, email, and password");
  }
  next();
}

export async function checkCredentialsLogin(req, res, next) {
  req.body.username = req?.body.username?.trim();
  // req.body.email = req?.body.email?.trim();
  req.body.password = req?.body.password?.trim();

  //const { username, email, password } = req.body;
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send("Please provide either username or email and password");
  }
  next();
}

export async function checkUserExist(req, res, next) {
  try {
    const { email } = req.body;
    const result = await getUserByEmail(email);

    if (result.status === "success" && result.data) {
      return res
        .status(409)
        .send({ data: "This email address is already registered" });
    } else if (result.status === "error") {
      return res.status(500).send({ data: result.error });
    }
    next();
  } catch (error) {
    console.error("Error in checkUserExist:", error);
    return res.status(500).send({ data: "Error checking duplicate user" });
  }
}

export function checkEmail(req, res, next) {
  const email = req?.body.email;

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).send({ data: "Email must contain '@' and '.'" });
  }
  next();
}
