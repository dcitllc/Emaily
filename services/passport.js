// Require Passport
const passport = require("passport");
// Google Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Require Mongoose
const mongoose = require("mongoose");
// Keys file
const keys = require("../config/keys");

// Get access to USer model class
const User = mongoose.model("users");

// Create new instance of Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save(); // Creates new user and makes attaches Oauth id to our googleId Field
    }
  )
);
