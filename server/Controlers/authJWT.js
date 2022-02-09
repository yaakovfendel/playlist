const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log("user", user._id);
      req.body.createdBy = user._id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = authJWT;
