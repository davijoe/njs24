import connection from "./connection.js";

export async function createUser(username, email, password) {
  const defaultUser = process.env.DEFAULT_USER || "normal";
  try {
    const result = await connection.query(
      "INSERT INTO users (username, email, password, user_role) VALUES ($1, $2, $3, $4) RETURNING id",
      [username, email, password, defaultUser],
    );

    const id = result.rows[0].id; // PostgreSQL stores the result in `rows` array
    const userResult = await getUserById(id);

    if (userResult.status === "success") {
      return { status: "success", data: userResult.data };
    } else {
      return { status: "error", error: userResult.error };
    }
  } catch (error) {
    console.log("Error creating user:", error);
    return { status: "error", error: "Error creating user" };
  }
}

// Example usage
// const newUser = await createUser("John", "Doe", "john.doe@example.com", "password123");
// console.log(newUser);

export async function getUserById(id) {
  try {
    const result = await connection.query(
      "SELECT username, email FROM users WHERE users.id = $1;",
      [id],
    );
    return { status: "success", data: result.rows[0] };
  } catch (error) {
    console.log("Error fetching user by id:", error);
    return { status: "error", error: "Error fetching user by id" };
  }
}
// Example usage
// const userById = await getUserById(1);
// console.log(userById);

export async function getUserByEmail(email) {
  try {
    const result = await connection.query(
      "SELECT id, email, password FROM users WHERE email = $1;",
      [email],
    );
    return { status: "success", data: result.rows[0] };
  } catch (error) {
    console.log("Error fetching user by email:", error);
    return { status: "error", error: "Error fetching user by email" };
  }
}
// Example usage
// const userByEmail = await getUserByEmail("john.doe@example.com");
// console.log(userByEmail);
