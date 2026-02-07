import { Application } from "../models/application.model.js";
import { TeamMember } from "../models/team_member.model.js";

// create application
export const createApplication = async (req, res) => {
    try {
        const {message} = req.body;
        const {teamId} = req.params;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            })
        }

        // get the leader of team
        const teamLeader = await TeamMember.find({
            teamId: teamId,
            teamRole: 'LEADER'
        })

        if (!teamLeader) {
            return res.status(400).json({
                success: false,
                message: "There is no team"
            })
        }

        const teamLeaderId = teamLeader.userId;
        const userId = req.user._id;

        const application = await Application.create({
            userId: userId,
            teamId: teamId,
            message: message,
            decidedBy: teamLeaderId
        })

        if (!application) {
            return res.status(400).json({
                success: false,
                message: "Application not created"
            })
        }

        res.status(201).json({
            success: true,
            message: "Application created successfully",
            application: application
        })
    } catch (error) {
        console.error("Error creating application: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating application"
        })
    }
}

// accept application
export const acceptApplication = async (req, res) => {
    try {
        const {applicationId} = req.params;

        const updatedApplication = await Application.findByIdAndUpdate(applicationId, 
            {
                status: 'ACCEPTED',
                decidedAt: Date.now()
            },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Application accepted",
            application: updatedApplication
        })
    } catch (error) {
        console.error("Error accepting application: ", error);
        res.status(500).json({
            success: false,
            message: "Error accepting application"
        })
    }
}

// reject application
export const rejectApplication = async (req, res) => {
    try {
        const {applicationId} = req.params;

        const updatedApplication = await Application.findByIdAndUpdate(applicationId, 
            {
                status: 'REJECTED',
                decidedAt: Date.now()
            },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Application rejected",
            application: updatedApplication
        })
    } catch (error) {
        console.error("Error rejecting application: ", error);
        res.status(500).json({
            success: false,
            message: "Error rejecting application"
        })
    }
}

// withdraw application
export const withdrawApplication = async (req, res) => {
    try {
        const {applicationId} = req.params;

        const updatedApplication = await Application.findByIdAndUpdate(applicationId, 
            {
                status: 'WITHDRAWN',
                decidedAt: Date.now(),
                decidedBy: req.user._id
            },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Application withdrawn",
            application: updatedApplication
        })
    } catch (error) {
        console.error("Error withdrawing application: ", error);
        res.status(500).json({
            success: false,
            message: "Error withdrawing application"
        })
    }
}

// get all applications
export const getAllApplication = async (req, res) => {
    try {
        const applications = await Application.find({
            userId: req.user._id
        })

        if (!applications) {
            return res.status(404).json({
                success: false,
                message: 'Applications not found'
            })
        }

        res.status(200).json({
            success: true,
            message: "All applications fetched successfully",
            applications: applications
        })
    } catch (error) {
        console.error("Error fetching applications: ", error);
        res.status(500).json({
            success: false,
            message: "Error fetching applications"
        })
    }
}