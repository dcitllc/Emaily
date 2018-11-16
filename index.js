// Import Express
const express = require("express");
// Create application
const app = express();

// Route Handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// Add port ENV
const PORT = process.env.PORT || 5000;

app.listen(PORT);
