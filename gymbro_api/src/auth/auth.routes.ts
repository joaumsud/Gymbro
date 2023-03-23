import express from "express";

import { login, refreshToken, revokeRefreshTokens, signup } from "./auth.controllers";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refresh_token", refreshToken);
authRouter.post("/revoke_refresh_tokens", revokeRefreshTokens); // Only admin users have acess to this endpoint

export default authRouter;
