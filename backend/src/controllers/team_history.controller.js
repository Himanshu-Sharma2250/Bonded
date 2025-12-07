import { TeamHistory } from "../models/team_history.model.js";
import { teamHistorySchema } from "../validators/history.validator.js";

// create team
export const teamCreated = async (req, res) => {
    const {teamId} = req.params;
    const {data, error} = teamHistorySchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {reason} = data;

    try {
        const history = await TeamHistory.create({
            teamId: teamId,
            teamAction: "CREATED",
            reason: reason
        })

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team created history",
            history
        })
    } catch (error) {
        console.error("Error in created team_created history ", error);
        res.status(500).json({
            success: false,
            message: "Error in created team_created history"
        })
    }
}

// member left
// member kicked out
// member joined
// team deleted