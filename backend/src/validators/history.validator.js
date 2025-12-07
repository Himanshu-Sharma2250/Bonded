import {z} from "zod";

export const teamHistorySchema = z.object({
    reason: z.string().trim()
})

export const userHistorySchema = z.object({
    reason: z.string().trim()
})