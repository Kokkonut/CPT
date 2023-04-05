const router = require("express").Router();


const authRoutes = require("./authRoutes");
const OrganizationRoutes = require("./organizationRoutes");
const UserRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/organization", OrganizationRoutes);
router.use("/user", UserRoutes);


module.exports = router;
