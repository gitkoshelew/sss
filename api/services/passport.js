const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

passport.userDB = userDB;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = passport.userDB.find(el=>el.id === id);
  done(null, user || false);
});

passport.use(new LocalStrategy({usernameField: 'email'},
  async (email, password, done) =>{
    try{

      const user = passport.userDB.find(el => el.email === email && el.password === password);
      
      if (user) {
        return done(null, user)
      }

      return done(null, false);

    }catch(err){
      if (err){
        return done(null, err)
      }
    }
  }
));