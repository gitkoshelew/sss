const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User').user;
const router = Router();
const bcrypt = require('bcrypt');
const env = require('../../config/env');

router.post(
  `/register`,
  [
    check('email', 'email incorrect').isEmail(),
    check('password', 'to short password (min 3)').isLength({ min: 6 }),
    check('name', 'to short name (min 2)').isLength({ min: 2 }),
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
      const { email, password, name } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'user exist' });
      }
      // const bcryptPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password, name });

      await user.save();

      const token = jwt.sign({ userId: user._id }, env.jwtSecret, { expiresIn: '1h' });

      return res.status(201).json({
        message: 'user created',
        token,
        userId: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'server error', message: 'went wrong try again' });
    }
  }
);

router.post(
  `/login`,
  [
    check('email', 'email incorrect').normalizeEmail().isEmail(),
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

      console.log(user._password);

      // const isMathedBC = await bcrypt.compare(password, user.password);

      const isMathed = user.authenticate(password);

      if (!isMathed) {
        return res.status(400).json({
          error: 'login error',
          message: `Password doesn't match. Try again`,
        });
      }

      const token = jwt.sign({ userId: user.id }, env.jwtSecret, { expiresIn: '1h' });

      res.json({ token, userId: user.id, name: user.name, email: user.email });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'login server error', message: 'went wrong try again' });
    }
  }
);

module.exports = router;
