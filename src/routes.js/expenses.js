const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT e.id, e.amount, e.description, e.trip_id, e.person_id,
             t.name AS trip_name,
             p.name AS person_name
      FROM expenses e
      LEFT JOIN trips t ON e.trip_id = t.id
      LEFT JOIN people p ON e.person_id = p.id
      ORDER BY e.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Create expense
router.post("/", async (req, res) => {
  try {
    const { trip_id, person_id, amount, description } = req.body;

    const result = await db.query(
      `INSERT INTO expenses(trip_id, person_id, amount, description)
       VALUES($1,$2,$3,$4) RETURNING *`,
      [trip_id, person_id, amount, description]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM expenses WHERE id=$1", [req.params.id]);
    res.json({ message: "Expense deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;