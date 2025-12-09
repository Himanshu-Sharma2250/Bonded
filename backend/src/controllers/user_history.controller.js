import { UserHistory } from "../models/user_history.model.js";
import { userHistorySchema } from "../validators/history.validator.js";

export const userJoined = async (req, res) => {
    const {userId} = req.params;
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
            userId: userId,
            userAction: "JOINED",
            reason: reason
        })
    
        await history.save()
        
        res.status(201).json({
            success: true,
            message: "User joined history",
            history
        })
        } catch (error) {
            console.error("Error in creating user_joined history ", error);
            res.status(500).json({
                success: false,
                message: "Error in creating user_joined history"
            })
        } 
}

export const userCreatedTeam = async (req, res) => {
    const {userHistoryId} = req.params;
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.findByIdAndUpdate(userHistoryId, {
            userAction: "CREATED",
            reason: reason
        }, {new: true})
    
        await history.save()
        
        res.status(200).json({
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
    const {userHistoryId} = req.params;
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.findByIdAndUpdate(userHistoryId, {
            userAction: "JOINED",
            reason: reason
        }, {new: true})
    
        await history.save()
        
        res.status(200).json({
            success: true,
            message: "User joined team history",
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
    const {userHistoryId} = req.params;
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.findByIdAndUpdate(userHistoryId, {
            userAction: "LEFT",
            reason: reason
        }, {new: true})
    
        await history.save()
        
        res.status(200).json({
            success: true,
            message: "User left team history",
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

export const userKickedOutTeam = async (req, res) => {
    const {userHistoryId} = req.params;
    const {data, error} = userHistorySchema.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }
    
    const {reason} = data;

    try {
        const history = await UserHistory.findByIdAndUpdate(userHistoryId, {
            userAction: "KICKED_OUT",
            reason: reason
        }, {new: true})
    
        await history.save()
        
        res.status(200).json({
            success: true,
            message: "User kicked out of team history",
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