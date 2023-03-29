const express = require("express");
const passport = require("../config/passport");


const router = express.Router();

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

module.exports = router;

