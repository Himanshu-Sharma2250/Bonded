import { Note } from "../models/note.model";
import { editNoteSchema, noteSchema } from "../validators/note.validator"

// create note
export const createNote = async (req, res) => {
    const {data, error} = noteSchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {title, description, isPrivate} = data;

    try {
        const note = await Note.create({
            title: title,
            description: description,
            isPrivate: isPrivate
        })

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        await note.save();

        res.status(201).json({
            success: false,
            message: 'Note created successfully',
            note
        })
    } catch (error) {
        console.error("Error creating note: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating note"
        })
    }
}

