const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const { getProjects } = require("../controllers/projectController");
const { updateProject } = require("../controllers/projectController");   

const { authenticateJWT } = require("../middleware/authenticateJWT");

router.post("/createProject", authenticateJWT, createProject);
router.get("/:orgId", authenticateJWT, getProjects);
router.patch("/:orgId/:projectId", authenticateJWT, updateProject);

module.exports = router;
