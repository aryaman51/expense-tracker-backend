const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const { trip_id, user_id } = req.query;
    let query = `
      SELECT e.id, e.amount, e.description, e.trip_id, e.user_id,
             t.name AS trip_name,
             p.name AS person_name
      FROM expenses e
      LEFT JOIN trips t ON e.trip_id = t.id
      LEFT JOIN people p ON e.user_id = p.id
      WHERE 1=1
    `;
    const params = [];
    if (trip_id) { params.push(trip_id); query += ` AND e.trip_id=$${params.length}`; }
    if (user_id) { params.push(user_id); query += ` AND e.user_id=$${params.length}`; }
    query += " ORDER BY e.id DESC";
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { trip_id, user_id, amount, description } = req.body;
    const result = await db.query(
      "INSERT INTO expenses(trip_id, user_id, amount, description) VALUES($1,$2,$3,$4) RETURNING *",
      [trip_id, user_id, amount, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { amount, description } = req.body;
    const result = await db.query(
      "UPDATE expenses SET amount=$1, description=$2 WHERE id=$3 RETURNING *",
      [amount, description, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update expense" });
  }
});

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