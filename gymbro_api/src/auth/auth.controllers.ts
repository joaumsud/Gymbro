import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwtLib from "jsonwebtoken";
import { v4 } from "uuid";

import { UserLoginValidate, UserSignupValidate } from "./auth.models";
import jwt from "../utils/jwt";
import hashToken from "../utils/hashToken";
import {
  addRefreshTokenToWhiteList,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from "./auth.services";
import {
  checkUserPassword,
  createUser,
  findUserByEmail,
  findUserById,
} from "../user/user.services";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = UserLoginValidate.parse(req.body);

    const user = await findUserByEmail(credentials.email);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Credenciais inválidas!" });
    }

    const validPassword = await checkUserPassword(
      credentials.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Credenciais inválidas!" });
    }

    const jti = v4();
    const [acessToken, refreshToken] = jwt.generateTokens(user, jti);
    await addRefreshTokenToWhiteList(jti, refreshToken, user.id);

    return res.json({ acessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newUser = UserSignupValidate.parse(req.body);

    const user = await findUserByEmail(newUser.email);
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Esse email já está sendo utilizado" });
    }

    newUser = await createUser(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Refresh token é necessário" });
    }

    const payload: any = jwtLib.verify(refreshToken, process.env.SECRET_KEY!);

    const savedRefreshToken = await findRefreshTokenById(payload.jti || "");
    if (!savedRefreshToken || savedRefreshToken.revoked == true) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token inválido" });
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token inválido" });
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Autorização inválida" });
    }

    await deleteRefreshToken(payload.jti);

    const jti = v4();
    const [acessToken, newRefreshToken] = jwt.generateTokens(user, jti);
    await addRefreshTokenToWhiteList(jti, newRefreshToken, user.id);

    return res.json({ acessToken, newRefreshToken });
  } catch (error) {
    next(error);
  }
};

const revokeRefreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    await revokeTokens(parseInt(userId));
    return res.json({ message: "Token revogados com sucesso" });
  } catch (error) {
    next(error);
  }
};

export { login, signup, refreshToken, revokeRefreshTokens };
