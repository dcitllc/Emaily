// Import Express
const express = require("express");
// Require Passport
const passport = require("passport");
// Google Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Keys file
const keys = require("./config/keys");

// Create application
const app = express();

// Create new instance of Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log(" profile", profile);
    }
  )
);

// Pass this route to Passport to handle the flow
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"] // The scope tells google what we want access to
  })
);

// Route hander to handle the case when user visits /auth/google/callback
app.get("/auth/google/callback", passport.authenticate("google"));

// Add port ENV
const PORT = process.env.PORT || 5000;

app.listen(PORT);
