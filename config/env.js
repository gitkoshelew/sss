const API_PORT = process.env.API_PORT || 5000;
const FRONTEND_PORT = process.env.PORT || 3001;
const checkApiUrl = () => {
  if (process.env.BROWSER && process.env.NODE_ENV !== "development") {
    return "/api";
  }

  return "http://localhost:" + API_PORT;
};
module.exports = {
  apiPort: API_PORT,
  apiUrl: checkApiUrl(),
  apiLoginUrl: "/api/auth/local/login",
  apiLogoutUrl: "/api/auth/local/logout",
  apiLoginGoogleUrl: "/api/auth/google",
  apiLogoutGoogleUrl: "/api/logout",
  mongoUri:
    "mongodb+srv://jskoshelew:Gbhfvblf11@cluster0-s1bvd.mongodb.net/test?retryWrites=true&w=majority",
  jwtSecret: "jskoshelew",
  portFrontend: FRONTEND_PORT,
  portWP: 8041,
  cookieKey: "cookie",
};
