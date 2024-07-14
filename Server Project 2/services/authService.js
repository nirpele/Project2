const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).send("No token provided");
    }
    const SECRET_KEY = "some_key";
    jwt.verify(token, SECRET_KEY, (err, data) => {
      if (err) {
        return res.status(500).send("Failed to authenticate token");
      }
      req.user = data; // Attach user data to request object
      next(); // Proceed to next middleware or route handler
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Authentication error");
  }
};

module.exports = { authenticateToken };