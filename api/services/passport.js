const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const userDB = [
  {
    id: 1,
    email: 'test@mail.ru',
    password: '123'
  },
  {
    id: 2,
    email: 'test2@mail.ru',
    password: '1232'
  }
]

// const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log('ser', user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('dser') // find session user

  const user = userDB.find(el=>el.id === id);
  done(null, user || false); // save user in session
});

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

passport.use(new LocalStrategy({usernameField: 'email'},
  async (email, password, done) =>{
    console.log('strategy')
    try{

      const user = userDB.find(el => el.email === email && el.password === password);

      if (user) {
        return done(null, user)
      }

      const doneUser = await (() => new Promise((res, rej) => {
        const newUser = {
          id: userDB[userDB.length-1].id + 1,
          email: email,
          password: password
        };

        userDB.push(newUser);

        res(false);
      }))()
  
      return done(null, doneUser); // to req.logIn

    }catch(err){
      if (err){
        return done(null, err) // to req.logIn
      }
    }
  }
));

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/api/auth/google/callback',
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });

//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const user = await new User({ googleId: profile.id }).save();
//       done(null, user);
//     }
//   )
// );
