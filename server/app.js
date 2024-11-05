import express from "express";
import pg from "pg";
import helmet from "helmet";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import flash from "connect-flash";
import pagesRouter from "./router/pagesRouter.js";
import authrouter from "./router/authRouter.js";
import { renderPage } from './util/templatingEngine.js';
import { readPage } from './util/readPages.js';

const app = express();
const { Client } = pg;

// Parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Set up environment variables
import dotenv from "dotenv";
dotenv.config();

// Initialize PostgreSQL connection
const client = new Client({
  user: process.env.PGUSER || "dan",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "hearthstone_db",
  password: process.env.PGPASSWORD || "your_password",
  port: process.env.PGPORT || 5432,
});

// Database initialization
async function initializeDatabase() {
  try {
    await client.connect();
    const res = await client.query("SELECT $1::text as message", ["Hello world!"]);
    console.log(res.rows[0].message);
  } catch (err) {
    console.error("Database query error:", err);
  } finally {
    await client.end();
  }
}
initializeDatabase();

// Serve static files
app.use(express.static("../client/public"));

// Set cookies to be secure in production
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(flash());

// Home route using custom template engine
app.get("/", (req, res) => {
  const homepage = readPage("../client/public/pages/homepage/homepage.html");
  const successMessage = req.flash("success");

  // Inject the flash message into the page
  const config = { tabTitle: "Home", successMessage };
  res.send(renderPage(homepage, config));
});

// To set security headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts
      imgSrc: ["'self'"], // Allow images from the same domain
    },
  })
);

// Middleware for auth and page routes
app.use(authrouter);
app.use(pagesRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
