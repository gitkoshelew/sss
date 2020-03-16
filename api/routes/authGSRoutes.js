const passport = require('passport');
const { Router } = require('express');
const router = Router();

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
