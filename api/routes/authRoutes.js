const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User').user;

module.exports = (app, path) => {
  app.post(
    `${path}/register`,
    [
      check('email', 'email incorrect').isEmail(),
      check('password', 'to short password (min 6)').isLength({ min: 6 }),
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Unvalid registration data',
          });
        }

        const { email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
          return res.status(400).json({ message: 'user exist' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();
        return res.status(201).json({ message: 'user created' });
      } catch (e) {
        res.status(500).json({ message: 'went wrong try again' });
      }
    }
  );

  app.post(
    `${path}/login`,
    [
      check('email', 'email incorrect')
        .normalizeEmail()
        .isEmail(),
      check('password', 'enter password').exists(),
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Unvalid enter data',
          });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({
            message: `User doesn't exist`,
          });
        }

        const isMathed = await bcrypt.compare(password, user.password);

        if (!isMathed) {
          return res.status(400).json({
            message: `Password doesn't match. Try again`,
          });
        }

        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

        res.json({ token, userId: user.id });
      } catch (e) {
        res.status(500).json({ message: 'went wrong try again' });
      }
    }
  );

  app.post(`${path}/registerPassport`, (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email || !password) {
        return res.status(401).send({ error: 'invalid email or password' });
      }
      const { userDB } = passport;
      const dbUser = userDB.find(el => el.email === email);
      console.log(dbUser);
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

  app.post(`${path}/loginPassport`, (req, res, next) => {
    passport.authenticate('local', function(err, user) {
      console.log('auth', user, 'passport', passport);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send('Faild email password');
      }
      req.logIn(user, function(err) {
        console.log('login');

        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
  });

  app.post(`${path}/logoutPassport`, (req, res, next) => {
    passport.authenticate('local', function(err, user) {
      console.log('logout');
      if (err) {
        return next(err);
      }

      req.logout();
      return res.send({ message: 'logout' });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/current_user', (req, res) => {
    res.send(req.user);
  });
};
