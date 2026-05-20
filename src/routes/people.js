const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM people ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch people" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM people WHERE id=$1", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Person not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch person" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.query(
      "INSERT INTO people(name) VALUES($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create person" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.query(
      "UPDATE people SET name=$1 WHERE id=$2 RETURNING *",
      [name, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update person" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM people WHERE id=$1", [req.params.id]);
    res.json({ message: "Person deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "can't delete person" });
  }
});

module.exports = router;