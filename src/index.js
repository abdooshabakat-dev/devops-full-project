const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello DevOps from Kubernetes V1🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "devops-full-project"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
