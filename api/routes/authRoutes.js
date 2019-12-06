const passport = require('passport');

module.exports = app => {

  app.post('/auth/local', (req, res, next) => {
    passport.authenticate('local', function(err, user) {
      console.log('auth', user);
      if (err) {
        return next(err); 
      }
      if (user == false){
        req.logout();
        return res.send({message: 'logout'})
      }
      if (!user) { 
        return res.send('Faild email password'); 
      }
      req.logIn(user, function(err) {
        console.log('login')
        
        if (err) {
          return next(err); 
        }
        return res.send(user);
      });
    })(req, res, next);
  });
  // app.get(
  //   '/auth/google',
  //   passport.authenticate('google', {
  //     scope: ['profile', 'email']
  //   })
  // );

  // app.get(
  //   '/auth/google/callback',
  //   passport.authenticate('google'),
  //   (req, res) => {
  //     res.redirect('/');
  //   }
  // );

  // app.get(
  //   '/api/auth/google/callback',
  //   passport.authenticate('google'),
  //   (req, res) => {
  //     res.redirect('/');
  //   }
  // );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/current_user', (req, res) => {
    res.send(req.user);
  });
};
