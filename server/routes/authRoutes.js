const express = require("express");
const authController = require("../controllers/authController");


const router = express.Router();

router.post("/login", authController.loginUser);

router.post('/signup', authController.signup);

router.post('/signupWithInvite', authController.signupWithInvite);

module.exports = router;
