// Import Express
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
// Import Passport Config
require("./models/User"); // This must come before we access passport
require("./services/passport");

mongoose.connect(keys.mongoURI);

// Create application
const app = express();

require("./routes/authRoutes")(app);

// Add port ENV
const PORT = process.env.PORT || 5000;

app.listen(PORT);
