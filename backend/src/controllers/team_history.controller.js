import { Team } from "../models/team.model.js";
import { TeamHistory } from "../models/team_history.model.js";
import { teamDeleteHistorySchema, teamHistorySchema, teamJoinedHistorySchema } from "../validators/history.validator.js";

// create team
export const teamCreated = async (req, res) => {
    const {teamId} = req.params;

    try {
        // check if create history is present or not
        const existingHistory = await TeamHistory.findOne({
            teamId: teamId,
            teamAction: "CREATED"
        })

        if (existingHistory) {
            return res.status(400).json({
                success: false,
                message: "Team Create History already exists"
            })
        }

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            })
        }

        const history = await TeamHistory.create({
            teamId: teamId,
            teamAction: "CREATED",
            title: "Team Created",
            description: `${team.name} is created`
        })

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

    const {reason, memberName} = data;

    try {
        const history = await TeamHistory.create({
            teamId: teamId,
            teamAction: "LEFT",
            title: "Team Member Left",
            description: `${memberName} left the team because "${reason}"`
        })

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

    const {reason, memberName} = data;

    try {
        const history = await TeamHistory.create({
            teamId: teamId,
            teamAction: "KICKED_OUT",
            title: "Team Member Kicked Out",
            description: `${memberName} kicked out of team because "${reason}"`
        })

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
    const {data, error} = teamJoinedHistorySchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {memberName} = data;

    try {
        const history = await TeamHistory.create({
            teamId: teamId,
            teamAction: "JOINED",
            title: "New Member Joined",
            description: `${memberName} joined team`
        })

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
    const {data, error} = teamDeleteHistorySchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {reason} = data;

    try {
        // check if create history is present or not
        const existingHistory = await TeamHistory.findOne({
            teamId: teamId,
            teamAction: "DELETED"
        })

        if (existingHistory) {
            return res.status(400).json({
                success: false,
                message: "Team Create History already exists"
            })
        }

        const history = await TeamHistory.create({
            teamId: teamId,
            teamAction: "DELETED",
            title: "Team Deleted",
            description: `Team is deleted because "${reason}"`
        })

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