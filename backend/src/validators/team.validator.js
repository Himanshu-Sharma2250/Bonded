import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string().trim(),
    description: z.string().trim()
})

export const joinTeamSchema = z.object({
    name: z.string().trim(),
    email: z.email({message: "Enter valid email"}).trim(),
    reasonToJoin: z.string().trim(),
    githubLink: z.string().trim()
})