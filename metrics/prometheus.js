const client = require("prom-client");

client.collectDefaultMetrics({
  prefix: "tripspend_",
});

module.exports = client;