const express = require("express");
const authController = require("../controllers/authController");
// const passport = require("../config/passport").passport;

const router = express.Router();

router.post("/login", authController.loginUser);

router.post('/signup', authController.signup);

module.exports = router;
