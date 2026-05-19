// backend/metrics/prometheus.js

const client = require("prom-client");

client.collectDefaultMetrics();

module.exports = client;