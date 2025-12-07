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
export const teamMemberLeft = async (req, res) => {
    const {teamHistoryId} = req.params;
    const {data, error} = teamHistorySchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {reason} = data;

    try {
        const history = await TeamHistory.findByIdAndUpdate(teamHistoryId, {
            teamAction: "LEFT",
            reason: reason
        }, {new: true})

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history updated",
            history
        })
    } catch (error) {
        console.error("Error in updating team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in updating team history"
        })
    }
}

// member kicked out
export const teamMemberKickedOut = async (req, res) => {
    const {teamHistoryId} = req.params;
    const {data, error} = teamHistorySchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {reason} = data;

    try {
        const history = await TeamHistory.findByIdAndUpdate(teamHistoryId, {
            teamAction: "KICKED_OUT",
            reason: reason
        }, {new: true})

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history updated",
            history
        })
    } catch (error) {
        console.error("Error in updating team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in updating team history"
        })
    }
}

// member joined
export const teamMemberJoined = async (req, res) => {
    const {teamHistoryId} = req.params;
    const {data, error} = teamHistorySchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {reason} = data;

    try {
        const history = await TeamHistory.findByIdAndUpdate(teamHistoryId, {
            teamAction: "JOINED",
            reason: reason
        }, {new: true})

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history updated",
            history
        })
    } catch (error) {
        console.error("Error in updating team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in updating team history"
        })
    }
}

// team deleted