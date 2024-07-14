const express = require("express");
const router = express.Router();


router.get('/generate/token',generateToken)

module.exports = router;