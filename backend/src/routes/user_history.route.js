import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userCreatedTeam, userDeletedTeam, userJoined, userJoinedTeam, userKickedOutOfTeam, userLeftTeam } from "../controllers/user_history.controller.js";

const userHistoryRouter = express.Router();

userHistoryRouter.post("/user-joined/:userId", verifyJWT, userJoined);
userHistoryRouter.patch("/user-joined-team/:userHistoryId", verifyJWT, userJoinedTeam);
userHistoryRouter.patch("/user-created-team/:userHistoryId", verifyJWT, userCreatedTeam);
userHistoryRouter.patch("/user-left-team/:userHistoryId", verifyJWT, userLeftTeam);
userHistoryRouter.patch("/user-kicked-out-team/:userHistoryId", verifyJWT, userKickedOutOfTeam);
userHistoryRouter.patch("/user-delete-team/:userHistoryId", verifyJWT, userDeletedTeam);

export default userHistoryRouter;