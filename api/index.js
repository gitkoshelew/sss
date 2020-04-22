const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const cors = require('cors');
const env = require('../config/env');
const API_PORT = env.apiPort;

require('./services/passport');

mongoose.Promise = global.Promise;

async function start() {
  try {
    await mongoose.connect(env.mongoUri),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      };

    app.listen(API_PORT, () => console.log('server running on port' + API_PORT));
  } catch (e) {
    console.log('Server Error', e.message);

    // process.exit(1);
  }
}

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [env.cookieKey],
  })
);
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

app.use('/auth', require('./routes/authRoutes'));
app.use('/authLocal', require('./routes/authLocalRoutes'));
app.use('/authGS', require('./routes/authGSRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/blog', require('./routes/blog'));

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
