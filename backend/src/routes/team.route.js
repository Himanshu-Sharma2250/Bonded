import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTeam, deleteTeam, getAllTeams, getTeam } from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.post("/create-team", verifyJWT, createTeam);
teamRouter.post("/get-team/:teamId", verifyJWT, getTeam);
teamRouter.post("/get-all-teams", verifyJWT, getAllTeams);
teamRouter.delete("/delete-team/:teamId", verifyJWT, deleteTeam);

export default teamRouter;