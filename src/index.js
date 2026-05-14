const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3000;

/* Collect default metrics */
client.collectDefaultMetrics();

/* Custom metric */
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

app.get("/", (req, res) => {
  httpRequestsTotal.inc();

  res.send("Hello DevOps from Kubernetes V3 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "devops-full-project",
  });
});

/* Metrics endpoint */
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
