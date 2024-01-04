const jwt = require('jsonwebtoken');
const User = require('../model/user');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized - No token' });
  }

  try {
    const decoded = jwt.verify(token, "for-now-there-is-no-secret");
    console.log("token = > ", decoded);
    req.user = await User.findById(decoded.user._id).select('-password'); 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized - Invalid token' });
  }
};

module.exports = { protect };
