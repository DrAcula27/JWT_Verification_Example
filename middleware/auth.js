const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if there is a token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "token not valid" });
  }
};
