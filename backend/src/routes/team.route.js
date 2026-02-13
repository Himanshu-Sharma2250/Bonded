import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTeam, deleteTeam, getAllTeams, getMyTeam, getTeam } from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.post("/create-team", verifyJWT, createTeam);
teamRouter.get("/get-team/:teamId", verifyJWT, getTeam);
teamRouter.get("/get-all-teams", verifyJWT, getAllTeams);
teamRouter.delete("/delete-team/:teamId", verifyJWT, deleteTeam);
teamRouter.get("/my-team", verifyJWT, getMyTeam)

export default teamRouter;