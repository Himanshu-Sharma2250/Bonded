import { UserHistory } from "../models/user_history.model.js";
import { userHistorySchema } from "../validators/history.validator.js";

export const userCreatedTeam = async (req, res) => {
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.create({
            userAction: "CREATED",
            reason: reason,
            userId: req.user._id
        })
    
        await history.save()
        
        res.status(201).json({
            success: true,
            message: "User created team history",
            history
        })
        } catch (error) {
            console.error("Error in creating user_created_team history ", error);
            res.status(500).json({
                success: false,
                message: "Error in creating user_created_team history"
            })
        } 
}

export const userJoinedTeam = async (req, res) => {
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.create({
            userAction: "JOINED",
            reason: reason,
            userId: req.user._id
        })
    
        await history.save()
        
        res.status(201).json({
            success: true,
            message: "User joined team",
            history
        })
        } catch (error) {
            console.error("Error in creating user_joined_team history ", error);
            res.status(500).json({
                success: false,
                message: "Error in creating user_joined_team history"
            })
        } 
}

export const userLeftTeam = async (req, res) => {
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.create({
            userAction: "LEFT",
            reason: reason,
            userId: req.user._id
        })
    
        await history.save()
        
        res.status(201).json({
            success: true,
            message: "User left team",
            history
        })
        } catch (error) {
            console.error("Error in creating user_left_team history ", error);
            res.status(500).json({
                success: false,
                message: "Error in creating user_left_team history"
            })
        } 
}

export const userKickedOutOfTeam = async (req, res) => {
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.create({
            userAction: "KICKED_OUT",
            reason: reason,
            userId: req.user._id
        })
    
        await history.save()
        
        res.status(201).json({
            success: true,
            message: "User kicked out of team",
            history
        })
        } catch (error) {
            console.error("Error in creating user_kickedOut_team history ", error);
            res.status(500).json({
                success: false,
                message: "Error in creating user_kickedOut_team history"
            })
        } 
}

export const userDeletedTeam = async (req, res) => {
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.create({
            userAction: "DELETED",
            reason: reason,
            userId: req.user._id
        })
    
        await history.save()
        
        res.status(201).json({
            success: true,
            message: "User deleted team history",
            history
        })
        } catch (error) {
            console.error("Error in creating user_delete_team history ", error);
            res.status(500).json({
                success: false,
                message: "Error in creating user_delete_team history"
            })
        } 
}

export const getUserHistories = async (req, res) => {
    const userId = req.user._id;

    try {
        const histories = await UserHistory.findById(userId);

        if (!histories) {
            return res.status(400).json({
                success: false,
                message: "No history present"
            })
        }

        res.status(200).json({
            success: false,
            message: "User history fetched successfully",
            histories
        })
    } catch (error) {
        console.log("Error fetching user histories: ", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user histories"
        })
    }
}