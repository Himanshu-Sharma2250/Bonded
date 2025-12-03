import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTeam, deleteTeam } from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.post("/create-team", verifyJWT, createTeam);
teamRouter.delete("/delete-team", verifyJWT, deleteTeam);

export default teamRouter;