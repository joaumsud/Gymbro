import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwtLib from "jsonwebtoken";

import { findUserById } from "../user/user.services";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Sem autorização para acessar essa rota" });
  }

  try {
    const token = authorizationHeader.split(" ")[1];
    const payload: any = jwtLib.verify(token, process.env.SECRET_KEY!);

    const user = await findUserById(payload.userId);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Autorização inválida" });
    }

    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    next(error);
  }
};

export { isAuthenticated };
