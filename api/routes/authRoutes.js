const passport = require("passport");

module.exports = app => {
  app.post("/auth/local/login", (req, res, next) => {
    passport.authenticate("local", function(err, user) {
      console.log("auth", user, "passport", passport);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send("Faild email password");
      }
      req.logIn(user, function(err) {
        console.log("login");

        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
  });

  app.post("/auth/local/logout", (req, res, next) => {
    passport.authenticate("local", function(err, user) {
      console.log("logout");
      if (err) {
        return next(err);
      }

      req.logout();
      return res.send({ message: "logout" });
    })(req, res, next);
  });

  app.post("/auth/local/register", (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email || !password) {
        return res.status(401).send({ error: "invalid email or password" });
      }
      const { userDB } = passport;
      const dbUser = userDB.find(el => el.email === email);
      console.log(dbUser);
      if (dbUser) {
        return res.status(401).send({ error: "user already exist" });
      }

      const newUser = {
        id: userDB[userDB.length - 1].id + 1,
        email: email,
        password: password
      };

      userDB.push(newUser);

      req.logIn(newUser, function(err) {
        return err ? next(err) : res.send({ password, email });
      });
    } catch (err) {
      next(err);
    }
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/current_user", (req, res) => {
    res.send(req.user);
  });
};
