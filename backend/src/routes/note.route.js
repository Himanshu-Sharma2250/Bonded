import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, editNote, getAllPrivateNotes, getAllPublicNotes } from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.post("/create/:userId/:teamId", verifyJWT, createNote);
noteRouter.patch("/edit/:noteId", verifyJWT, editNote);
noteRouter.get("/get-private-notes/:teamId", verifyJWT, getAllPrivateNotes);
noteRouter.get("/get-public-notes/:teamId", verifyJWT, getAllPublicNotes);
noteRouter.delete("/delete/:noteId", verifyJWT, deleteNote);

export default noteRouter;