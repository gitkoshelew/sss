const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.autorisation.split('')[1];
    if (!token) {
      res.status(401).json({ message: 'not autorized' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret')); //расшифровка токена
    // if (!decoded) {
    //   res.status(401).json({ message: 'not autorized' });
    // }
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'not autorized' });
  }
};
