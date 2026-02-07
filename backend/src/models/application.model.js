import mongoose, { Schema } from "mongoose";
import { ApplicationStatus, availableApplicationStatus } from "../constant.js";

const applicationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: availableApplicationStatus,
            default: ApplicationStatus.PENDING,
            required: true
        },
        decidedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        appliedAt: {
            type: Date,
            default: Date.now()
        },
        decidedAt: {
            type: Date
        },
    }, 
    {timestamps: true}
)

export const Application = mongoose.model("Application", applicationSchema);