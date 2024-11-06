import { getUserByUsername } from "../database/userRepository.js";
import { verifyPassword } from "../util/passwordUtils.js";

export async function autenticateUser(req, res, next) {
  try {
    const { username, password } = req.body;

    const result = await getUserByUsername(username);

    if (result.status === "error") {
      return res.status(500).send({ data: result.error });
    }

    if (!result.data) {
      return res.status(401).send({ data: "Incorrect username or password" });
    }

    const isValid = verifyPassword(password, result.data.password);

    if (!isValid) {
      return res.status(401).send({ data: "Incorrect username or password" });
    }

    req.userId = result.data.id;
    next();
  } catch (error) {
    console.error("Error in autenticateUser:", error);
    return res.status(500).send({ data: "Error during authentication" });
  }
}

export function authenticateSession(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ data: "Unauthorized" });
  }
  next();
}
