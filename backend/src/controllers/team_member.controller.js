import { Team } from "../models/team.model";
import { TeamMember } from "../models/team_member.model";

// join a team - create team member
export const joinTeam = async (req, res) => {
    const {teamId} = req.params;

    try {
        // checking if user is a member of another team
        const joinedAnotherTeam = await TeamMember.findOne({
            userId: req.user._id,
            active: true
        })

        if (joinedAnotherTeam) {
            return res.status(400).json({
                success: false,
                message: "Cannot another team"
            })
        }

        // check if user is a leader of another team
        const leaderOfTeam = await Team.findOne({
            userId: req.user._id
        })

        if (leaderOfTeam) {
            return res.status(400).json({
                success: false,
                message: 'Team owners/leaders cannot join other teams.'
            });
        }

        const alreadyJoined = await TeamMember.findOne({
            userId: req.user._id,
            teamId: teamId
        })

        if (alreadyJoined) {
            return res.status(400).json({
                success: false,
                message: "You already joined a team"
            })
        }

        const teamMember = await TeamMember.create({
            userId: req.user._id,
            teamId: teamId
        })

        if (!teamMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }

        await teamMember.save();

        const existingTeamMember = await TeamMember.findOne({
            userId: req.user._id,
            teamId: teamId
        })

        if (!existingTeamMember) {
            return res.status(400).json({
                success: false,
                message: "Team member not found"
            })
        }

        res.status(201).json({
            success: true,
            message: "team member joined",
            teamMember
        })
    } catch (error) {
        console.error("Error joining team", error);
        res.status(500).json({
            success: false,
            message: "Error joining team"
        })
    }
}

// left a team
export const leftTeam = async (req, res) => {
    const {teamId} = req.params;

    try {
        const alreadyLeftTeam = await TeamMember.findOne({
            userId: req.user._id,
            teamId: teamId,
            active: false
        })

        if (alreadyLeftTeam) {
            return res.status(400).json({
                success: false,
                message: "Already left the team"
            })
        }

        const leftTeam = await TeamMember.findByIdAndUpdate(teamId,
            {active: false},
            {new: true}
        );

        if (!leftTeam) {
            return res.status(400).json({
                success: false,
                message: "didn't left the team"
            })
        }

        res.status(200).json({
            success: true,
            message: "Left the team"
        })
    } catch (error) {
        console.error("Error lefting the team", error)
        res.status(500).json({
            success: false,
            message: "Error lefting the team"
        })
    }
}

// kicked out of a team


// get a team member 
// get all team members