const express = require('express');
const router = express.Router();
const { createOrganization } = require('../controllers/organizationController');
const { joinOrganization } = require('../controllers/organizationController');
const { updateJoinRequest } = require('../controllers/organizationController');

const  { authenticateJWT } = require('../middleware/authenticateJWT');

router.post('/create', authenticateJWT, createOrganization);
router.post('/join', authenticateJWT, joinOrganization);
router.post('/update-join-request', authenticateJWT, updateJoinRequest);

module.exports = router;