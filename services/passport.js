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

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the id that mongo assigns not the one google assigns
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Create new instance of Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // Already have a record with the given profile ID
          console.log("User Already Exists");
          done(null, existingUser); // Tells passport we are done.
        } else {
          // We dont have a user with this ID, make a new record.
          new User({ googleId: profile.id }) // Creates new user and makes attaches Oauth id to our googleId Field
            .save()
            .the(user => done(null, user)); // Tells passport we are done.
        }
      });
    }
  )
);
