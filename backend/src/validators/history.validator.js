import {z} from "zod";

export const teamHistorySchema = z.object({
    reason: z.string().trim(),
    memberName: z.string().trim()
})

export const teamJoinedHistorySchema = z.object({
    memberName: z.string().trim()
})

export const teamDeleteHistorySchema = z.object({
    reason: z.string().trim()
})

export const userHistorySchema = z.object({
    reason: z.string().trim()
})