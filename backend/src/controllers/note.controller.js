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

// edit note
export const editNote = async (req, res) => {
    const {data, error} = editNoteSchema.safeParse(req.body);
    const {noteId} = req.params;

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error in req body"
        })
    }

    const {title, description, isPrivate} = data;

    try {
        const note = await Note.findByIdAndUpdate(noteId, {
            title: title,
            description: description,
            isPrivate: isPrivate
        }, {new: true})

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not edited"
            })
        }

        await note.save();

        res.status(201).json({
            success: false,
            message: 'Note edit successfully',
            note
        })
    } catch (error) {
        console.error("Error editing note: ", error);
        res.status(500).json({
            success: false,
            message: "Error editing note"
        })
    }
}
