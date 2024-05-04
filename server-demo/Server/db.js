import postgres from "postgres";

export const sql = postgres({
  host: "localhost",
  port: 5432,
  db: "postgres",
  username: "postgres",
  password: "9669",
});
