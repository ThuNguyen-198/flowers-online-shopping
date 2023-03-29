const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_token_needed_to_be_authorized");
    next();
  } catch (error) {
    res.status(400).json({ message: "Auth failed!" });
  }
};
