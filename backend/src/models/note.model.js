import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean
    }
}, { timestamps: true })

export const Note = mongoose.model("Note", noteSchema);