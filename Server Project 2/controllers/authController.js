const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Entry Point: http://localhost:3000/auth

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username == "e" && password == "e") {
    const userId = "some_id";
    const SECRET_KEY = "some_key";
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
    res.send({ accessToken: token });
  }
});

module.exports = router;
