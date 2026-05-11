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

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM trips WHERE id=$1", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Trip not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trip" });
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

router.put("/:id", async (req, res) => {
  try {
    const { name, destination } = req.body;
    const result = await db.query(
      "UPDATE trips SET name=$1, destination=$2 WHERE id=$3 RETURNING *",
      [name, destination, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update trip" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM trips WHERE id=$1", [req.params.id]);
    res.json({ message: "Trip deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

module.exports = router;