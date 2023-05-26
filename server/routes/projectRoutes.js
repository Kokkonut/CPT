const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");


const { authenticateJWT } = require("../middleware/authenticateJWT");

router.post("/createProject", authenticateJWT, createProject);



module.exports = router;
