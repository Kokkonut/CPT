const router = require("express").Router();


const authRoutes = require("./authRoutes");
const OrganizationRoutes = require("./organizationRoutes");

router.use("/auth", authRoutes);
router.use("/organization", OrganizationRoutes);


module.exports = router;
