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
