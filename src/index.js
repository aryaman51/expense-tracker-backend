const express = require("express");
const trips = require("./routes/trips");
const dashboard = require("./routes/dashboard");
const expenses = require("./routes/expenses");
const people = require("./routes/people");

app.use("/api/expenses", expenses);
app.use("/api/people", people);

const app = express();
app.use(express.json());

app.use("/api/trips", trips);
app.use("/api/dashboard", dashboard);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});