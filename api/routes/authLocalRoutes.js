const passport = require('passport');
const { Router } = require('express');
const router = Router();

router.post(`/register`, (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ error: 'invalid email or password' });
    }
    const { userDB } = passport;
    const dbUser = userDB.find(el => el.email === email);

    if (dbUser) {
      return res.status(401).send({ error: 'user already exist' });
    }

    const newUser = {
      id: userDB[userDB.length - 1].id + 1,
      email: email,
      password: password,
    };

    userDB.push(newUser);

    req.logIn(newUser, function(err) {
      return err ? next(err) : res.send({ password, email });
    });
  } catch (err) {
    next(err);
  }
});

router.post(`/login`, (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Faild email password');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
});

router.post(`/logout`, (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }

    req.logout();
    return res.send({ message: 'logout' });
  })(req, res, next);
});

module.exports = router;
