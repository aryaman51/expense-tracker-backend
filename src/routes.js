const express = require('express');
const router = express.Router();
const db = require('./db');

// Example route: fetch all expenses
router.get('/expenses', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM expenses');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching expenses');
  }
});

router.get('/health', (req, res) => {
  res.send('Backend is running successfully!');
});

module.exports = router;
