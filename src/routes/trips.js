const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM trips ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, destination } = req.body;

    const result = await db.query(
      "INSERT INTO trips(name, destination) VALUES($1,$2) RETURNING *",
      [name, destination]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

module.exports = router;