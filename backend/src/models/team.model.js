import mongoose, {Schema} from "mongoose";

const teamSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

teamSchema.index(
    {userId: 1},
    {
        unique: true,
        partialFilterExpression: { isDeleted: false }
    }
)

export const Team = mongoose.model("Team", teamSchema);