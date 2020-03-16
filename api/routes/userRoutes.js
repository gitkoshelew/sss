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
        message: `no users now`,
      });
    }

    const mapUsers = users.map(({ name, email }) => ({
      name,
      email,
    }));

    res.send({ users: mapUsers });
  } catch (e) {
    res.status(500).json({ message: 'went wrong try again' });
  }
});

router.get('/admins', requireToken, async (req, res) => {
  try {
    const admins = await Admin.find({});

    if (!admins) {
      return res.status(400).json({
        message: `no users now`,
      });
    }

    const mapAdmins = admins.map(({ name }) => ({
      name,
    }));

    res.send({ admins: mapAdmins });
  } catch (e) {
    res.status(500).json({ message: 'went wrong try again' });
  }
});

router.get('/userMock', (req, res) => {
  res.send(usersMock);
});

module.exports = router;

const usersMock = [
  { id: 1, name: '</script><script>alert(1234567890)</script>' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' },
];
