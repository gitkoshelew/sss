const API_PORT = 5000;
const checkApiUrl = () => {
  if (process.env.BROWSER && process.env.NODE_ENV !== 'development') {
    return '/api';
  }

  return 'http://localhost:' + API_PORT;
};
export default {
  apiPort: API_PORT,
  apiUrl: checkApiUrl(),
  apiLoginUrl: '/api/auth/local/login',
  apiLogoutUrl: '/api/auth/local/logout',
  apiLoginGoogleUrl: '/api/auth/google',
  apiLogoutGoogleUrl: '/api/logout',
};
