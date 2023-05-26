const Organization = require("../models/Organization");
// const User = require("../models/User");
const Project = require("../models/Project");
// const Task = require("../models/Task");
// const TaskInstance = require("../models/TaskInstance");

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, organizationId } = req.body;
        const userId = req.user.id;
        console.log("NEW PROJECT: NAME:", name)
        console.log("NEW PROJECT: DESCRIPTION:", description)
        console.log("NEW PROJECT: START DATE:", startDate)
        console.log("NEW PROJECT: END DATE:", endDate)
        console.log("NEW PROJECT: ORGANIZATION ID:", organizationId)
        console.log("NEW PROJECT: USER ID:", userId)

        const newProject = new Project({
            name,
            description,
            startDate,
            endDate,
            organization: organizationId,
            owner: userId,
        });

        const savedProject = await newProject.save();

        await Organization.findByIdAndUpdate(
            organizationId,
            {
                $push: {
                    projects: {
                        project: savedProject._id,
                        role: "owner",
                    },
                },
            },
            { new: true }
        );

        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json(error);
    }
};
