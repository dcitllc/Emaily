// Require Passport
const passport = require("passport");

module.exports = app => {
  // Pass this route to Passport to handle the flow
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"] // The scope tells google what we want access to
    })
  );

  // Route hander to handle the case when user visits /auth/google/callback
  app.get("/auth/google/callback", passport.authenticate("google"));

  // Route handler to handle authenticated user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
