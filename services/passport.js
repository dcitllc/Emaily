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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // Already have a record with the given profile ID
        console.log("User Already Exists");
        done(null, existingUser); // Tells passport we are done.
      } else {
        // We dont have a user with this ID, make a new record.
        const user = await new User({ googleId: profile.id }).save(); // Creates new user and makes attaches Oauth id to our googleId Field
        done(null, user); // Tells passport we are done.
      }
    }
  )
);
