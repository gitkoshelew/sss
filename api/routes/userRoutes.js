const { Router } = require('express');
const requirePassport = require('../middlewares/requirePassport');
const requireToken = require('../middlewares/requireToken');
const router = Router();

const User = require('../models/User').user;
const Admin = require('../models/Admin').admin;

router.get('/', requirePassport, async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(400).json({
        error: 'get users error',
        message: `no users now`,
      });
    }

    const mapUsers = users.map(({ name, email }) => ({
      name,
      email,
    }));

    res.send({ users: mapUsers });
  } catch (e) {
    res.status(500).json({
      error: 'get users server error',
      message: 'went wrong try again',
    });
  }
});

router.get('/admins', requireToken, async (req, res) => {
  try {
    const admins = await Admin.find({});

    if (!admins) {
      return res.status(400).json({
        error: 'get admins error',
        message: `no admins now`,
      });
    }

    const mapAdmins = admins.map(({ name }) => ({
      name,
    }));

    res.send({ admins: mapAdmins });
  } catch (e) {
    res.status(500).json({
      error: 'get admins server error',
      message: 'went wrong try again',
    });
  }
});

module.exports = router;
