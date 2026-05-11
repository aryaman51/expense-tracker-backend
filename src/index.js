const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./db");
const trips = require("./routes/trips");
const dashboard = require("./routes/dashboard");
const expenses = require("./routes/expenses");
const people = require("./routes/people");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenses);
app.use("/api/users", people);
app.use("/api/trips", trips);
app.use("/api/dashboard", dashboard);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const runMigrations = async () => {
  const sql = fs.readFileSync(path.join(__dirname, "../init.sql"), "utf8");
  await db.query(sql);
  console.log("Database migrations complete");
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
  await runMigrations();
  console.log(`Backend running on port ${PORT}`);
});