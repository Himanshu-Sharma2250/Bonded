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



