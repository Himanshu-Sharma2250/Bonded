import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { teamCreated, teamDeleted, teamMemberJoined, teamMemberKickedOut, teamMemberLeft } from "../controllers/team_history.controller.js";

const teamHistoryRouter = express.Router();

teamHistoryRouter.post("/create-team/:teamId", verifyJWT, teamCreated);
teamHistoryRouter.patch("/member-left/:teamHistoryId", verifyJWT, teamMemberLeft);
teamHistoryRouter.patch("/member-kicked-out/:teamHistoryId", verifyJWT, teamMemberKickedOut);
teamHistoryRouter.patch("/member-joined/:teamHistoryId", verifyJWT, teamMemberJoined);
teamHistoryRouter.patch("/team-delete/:teamHistoryId", verifyJWT, teamDeleted);

export default teamHistoryRouter;