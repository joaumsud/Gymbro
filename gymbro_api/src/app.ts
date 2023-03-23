import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";
import { StatusCodes } from "http-status-codes";
import { isAuthenticated } from "./auth/auth.middlewares";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

app.get("/api/v1/hello", (req: Request, res: Response) =>
  res.json({ message: "Hello, World!" })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", isAuthenticated, userRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) =>
  res.status(StatusCodes.BAD_REQUEST).json(error)
);

app.listen(port, () => console.log(`Server is running on port ${port}`));
