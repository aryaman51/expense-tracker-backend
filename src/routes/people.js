const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all people
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM people ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch people" });
  }
});

// Add person
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

// Delete person
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM people WHERE id=$1", [req.params.id]);

    res.json({ message: "Person deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete person" });
  }
});

module.exports = router;