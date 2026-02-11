import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllHistory, teamCreated, teamDeleted, teamMemberJoined, teamMemberKickedOut, teamMemberLeft } from "../controllers/team_history.controller.js";

const teamHistoryRouter = express.Router();

teamHistoryRouter.post("/create-team/:teamId", verifyJWT, teamCreated);
teamHistoryRouter.post("/member-left/:teamId", verifyJWT, teamMemberLeft);
teamHistoryRouter.post("/member-kicked-out/:teamId", verifyJWT, teamMemberKickedOut);
teamHistoryRouter.post("/member-joined/:teamId", verifyJWT, teamMemberJoined);
teamHistoryRouter.post("/team-delete/:teamId", verifyJWT, teamDeleted);
teamHistoryRouter.get("/history/:teamId", verifyJWT, getAllHistory);

export default teamHistoryRouter;