import bcrypt from "bcrypt";

const saltRounds = 10;

// returns hashed password as string
export function hashPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

// returns boolean. True if password mathes
export function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
