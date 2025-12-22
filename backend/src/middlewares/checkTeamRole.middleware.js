import { TeamMember } from "../models/team_member.model.js";

export const checkTeamRole = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const isLeader = await TeamMember.findOne({
            userId: userId,
            teamRole: "LEADER",
            active: true
        })

        if (!isLeader) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request (must be leader to perform this action)"
            })
        }

        next();
    } catch (error) {
        console.error("Error checking team role: ", error);
        res.status(500).json({
            success: false,
            message: "Error checking team role"
        })
    }
}