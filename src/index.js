const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// Register routes
app.use('/api', routes);
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


const PORT = process.env.PORT || 3000;
appapp.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
