import {z} from "zod";

export const noteSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    isPrivate: z.boolean()
})

export const editNoteSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    isPrivate: z.boolean()
})