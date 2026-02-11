import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, editNote, getAllPrivateNotes, getAllPublicNotes } from "../controllers/note.controller.js";
import { checkTeamRole } from "../middlewares/checkTeamRole.middleware.js";

const noteRouter = express.Router();

noteRouter.post("/create/:teamId", verifyJWT, checkTeamRole, createNote);
noteRouter.patch("/edit/:noteId", verifyJWT, checkTeamRole, editNote);
noteRouter.get("/get-private-notes/:teamId", verifyJWT, checkTeamRole, getAllPrivateNotes);
noteRouter.get("/get-public-notes/:teamId", verifyJWT, checkTeamRole, getAllPublicNotes);
noteRouter.delete("/delete/:noteId", verifyJWT, checkTeamRole, deleteNote);

export default noteRouter;