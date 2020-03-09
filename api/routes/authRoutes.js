const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User').user;
const router = Router();

router.post(
  `/register`,
  [
    check('email', 'email incorrect').isEmail(),
    check('password', 'to short password (min 6)').isLength({ min: 6 }),
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
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword, name });

      await user.save();
      return res.status(201).json({ message: 'user created' });
    } catch (e) {
      res.status(500).json({ message: 'went wrong try again' });
    }
  }
);

router.post(
  `/login`,
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

      res.json({ token, userId: user.id, name: user.name });
    } catch (e) {
      res.status(500).json({ message: 'went wrong try again' });
    }
  }
);

module.exports = router;
