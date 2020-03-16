module.exports = (req, res, next) => {
  console.log('middlewarelogin', req.user)
  // if (!req.user) {
  //   return res.status(401).send({ error: 'You must log in!' });
  // }

  if (!req.isAuthenticated()){
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
