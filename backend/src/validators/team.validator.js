import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string().trim(),
    description: z.string().trim()
})