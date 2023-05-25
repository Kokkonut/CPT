const router = require("express").Router();


const authRoutes = require("./authRoutes");
const OrganizationRoutes = require("./organizationRoutes");
const UserRoutes = require("./userRoutes");
const InviteRoutes = require("./inviteRoutes");

router.use("/auth", authRoutes);
router.use("/org", OrganizationRoutes);
router.use("/user", UserRoutes);
router.use("/invite", InviteRoutes)


module.exports = router;
