import mongoose, {Schema} from "mongoose";
import { availableUserActions, UserAction } from "../constant.js";

const userHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userAction: {
        type: String,
        enum: availableUserActions,
        default: UserAction.JOINED,
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

export const UserHistory = mongoose.model("UserHistory", userHistorySchema)