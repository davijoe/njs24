import "dotenv/config";

import pkg from "pg";

const { Pool } = pkg;

console.log("PGUSER:", process.env.PGUSER);
console.log("PGDATABASE:", process.env.PGDATABASE);

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export default pool;
