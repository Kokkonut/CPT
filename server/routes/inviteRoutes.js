const express = require("express");
const inviteController = require("../controllers/inviteController");

const router = express.Router();

router.post("/invite", inviteController.inviteUser);

module.exports = router;
