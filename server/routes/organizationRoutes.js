const express = require('express');
const router = express.Router();
const { createOrganization } = require('../controllers/organizationController');
const  { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/create', authenticateJWT, createOrganization);

module.exports = router;