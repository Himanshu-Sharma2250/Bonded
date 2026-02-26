import mongoose, {Schema} from "mongoose";
import { availableTeamActions, TeamAction } from "../constant.js";

const teamHistorySchema = new Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    teamAction: {
        type: String,
        enum: availableTeamActions,
        default: TeamAction.CREATED,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true })

export const TeamHistory = mongoose.model("TeamHistory", teamHistorySchema);