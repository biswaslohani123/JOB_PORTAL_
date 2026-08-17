
import mongoose, { Schema, models } from "mongoose";

const jobSchema = new Schema ({

    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    company: {type: String, required: true, trim: true},
    location: {type: String, required: true, trim: true},
    salary: {type: Number, required: true},
    jobType: {type: String, enum: ["full-time", "part-time", "internship", "contract"]},
    experienceLevel: {type: String, enum: ["entry", "mid", "senior"]},
    skills: {type: [String], required: true},
    status: {type: String, enum: ["active", "closed"], default: "active"},
    deadline: {type: Date, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true})

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema)

export default Job