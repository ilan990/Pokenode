const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    
    // Vérifiez le rôle de l'utilisateur
    if (user.role !== 'admin') return res.status(403).send('Forbidden');

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
