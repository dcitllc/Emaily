// Require Passport
const passport = require("passport");
// Google Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Keys file
const keys = require("../config/keys");

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
