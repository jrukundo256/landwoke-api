const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kanzu123';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.json(err);
        return res.sendStatus(403);
      }

      console.log('Howd..');
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT };