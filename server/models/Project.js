const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
        trim: true,
    },
    endDate: {
        type: Date,
        required: true,
        trim: true,
    },
    employees: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;