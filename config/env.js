const API_PORT = process.env.API_PORT || 5010;

module.exports = {
  API_PORT: API_PORT,
  apiUrl:
    process.env.BROWSER && process.env.NODE_ENV !== 'development'
      ? '/api'
      : 'http://localhost:' + API_PORT,
  apiLoginUrl: '/api/auth/local/login',
  apiLogoutUrl: '/api/auth/local/logout',
  apiLoginGoogleUrl: '/api/auth/google',
  apiLogoutGoogleUrl: '/api/logout',
  mongoUri: 'mongodb+srv://admin:admin@cluster0-vwmoz.mongodb.net/test',
  jwtSecret: 'jskoshelew',
  CLIENT_PORT: process.env.PORT || 3001,
  WEBPACK_PORT: 8041,
  cookieKey: 'cookie',
};
