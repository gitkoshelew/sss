const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const cors = require('cors');
const keys = require('./config/keys');
const env = require('./config/env');
const config = require('config');

require('./services/passport');

mongoose.Promise = global.Promise;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const PORT = process.env.PORT || config.get('port') || 5000;
    app.listen(PORT, () => console.log('server running on port' + PORT));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
app.use(
  session({
    secret: env.key,
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true, //server only
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('/auth', require('./routes/authRoutes'));
require('/authLocal', require('./routes/authLocalRoutes'));
require('/authGS', require('./routes/authGSRoutes'));
require('/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  let adminContent = `
    <div>
      You don't appear to be logged in.  You can log in by visiting
      <a href="/auth/google">the Authentication Route</a>. You could
      also look at details about yourself at <a href="/current_user">the Current User route</a>
    </div>
  `;
  if (req.user) {
    adminContent = `
      <div>
        You appear to be logged in, so you can visit <a href="/admins">the Admins route</a>
        or you can <a href="/logout">Logout</a>.
      </div>
    `;
  }
  res.send(`
    <div>
      <h4>Hi!  Welcome to the React SSR API</h4>
      <div>
        You can see <a href="/users">the Users route</a>
      </div>
      ${adminContent}
    </div>
  `);
});

start();
