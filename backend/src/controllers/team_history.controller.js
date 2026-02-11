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
            teamAction: "LEFT",
            reason: reason,
            teamId: teamId
        })

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history created",
            history
        })
    } catch (error) {
        console.error("Error in member left team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in member left team history"
        })
    }
}

// member kicked out
export const teamMemberKickedOut = async (req, res) => {
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
            teamAction: "KICKED_OUT",
            reason: reason,
            teamId: teamId
        })

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history created",
            history
        })
    } catch (error) {
        console.error("Error in member kick out of team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in member kick out of team history"
        })
    }
}

// member joined
export const teamMemberJoined = async (req, res) => {
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
            teamAction: "JOINED",
            reason: reason,
            teamId: teamId
        }, {new: true})

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history created",
            history
        })
    } catch (error) {
        console.error("Error in member joined team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in member joined team history"
        })
    }
}

// team deleted
export const teamDeleted = async (req, res) => {
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
            teamAction: "DELETED",
            reason: reason,
            teamId: teamId
        }, {new: true})

        await history.save()

        res.status(201).json({
            success: true,
            message: "Team history created",
            history
        })
    } catch (error) {
        console.error("Error in delete team history ", error);
        res.status(500).json({
            success: false,
            message: "Error in delete team history"
        })
    }
}

// get all history
export const getAllHistory = async (req, res) => {
    const {teamId} = req.params;

    try {
        const history = await TeamHistory.find({
            teamId: teamId
        })

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "History not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "History fetched",
            history
        })
    } catch (error) {
        console.error("Error fetching history: ", error);
        res.status(500).json({
            success: false,
            message: "Error fetching history"
        })
    }
}