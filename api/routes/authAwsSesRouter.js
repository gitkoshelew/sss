const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User').user;
const router = Router();
const env = require('../../config/env');
const { register } = require('../controllers/authAwsSes');

router.post(`/register`, register);

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
