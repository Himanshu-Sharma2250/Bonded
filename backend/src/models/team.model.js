import mongoose, {Schema} from "mongoose";

const teamSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true
    },
    techUsed: [{
        type: String
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

teamSchema.virtual('members', {
    ref: 'TeamMember',          // The model to use
    localField: '_id',          // Find TeamMember where `localField`
    foreignField: 'teamId',     // equals `foreignField`
    justOne: false,             // Returns an array of members
});

teamSchema.index(
    {userId: 1},
    {
        unique: true,
        partialFilterExpression: { isDeleted: false }
    }
)

export const Team = mongoose.model("Team", teamSchema);