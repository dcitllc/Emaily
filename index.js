// Import Express
const express = require("express");
// Import Passport Config
require("./services/passport");

// Create application
const app = express();

require("./routes/authRoutes")(app);

// Add port ENV
const PORT = process.env.PORT || 5000;

app.listen(PORT);
