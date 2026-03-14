const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const trips = await db.query("SELECT COUNT(*) FROM trips");
    const expenses = await db.query("SELECT COUNT(*) FROM expenses");
    const totalSpent = await db.query(
      "SELECT COALESCE(SUM(amount),0) FROM expenses"
    );

    res.json({
      totalTrips: trips.rows[0].count,
      totalExpenses: expenses.rows[0].count,
      totalSpent: totalSpent.rows[0].coalesce
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard query failed" });
  }
});

module.exports = router;