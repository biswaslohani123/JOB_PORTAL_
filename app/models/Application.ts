import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema ({

    job: {type: Schema.Types.ObjectId, ref: "Job", required: true},
    applicant: {type: Schema.Types.ObjectId, ref: "User", required: true},
    coverLetter: {type: String, required: true, trim: true},
    resume: {type: String, required: true, trim: true},
    status: {type: String, enum: ["pending", "shortlisted", "rejected", "accepted"], default: "pending"}

}, {timestamps: true})

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema)

export default Application