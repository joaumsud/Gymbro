import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import path from "path";
import fs from "fs";

import db from "../utils/db";

const me = async (req: Request, res: Response) => {
  return res.json(req.user);
};

const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Nenhuma imagem recebida" });
  }
  try {
    if (req.user?.profilePicturePath) {
      try {
        fs.unlinkSync(req.user.profilePicturePath);
      } catch (error) {}
    }

    const urlPath = `${req.protocol}://${req.get("host")}/`;
    const filePath = req.file.path.split(path.sep).join("/");
    const user = await db.user.update({
      where: { id: req.user?.id },
      data: {
        profilePictureUrl: urlPath + filePath.replace("uploads/", ""),
        profilePicturePath: filePath,
      },
    });
    return res.json({
      message: "Foto de perfil atualizado com sucesso",
      profilePictureUrl: user.profilePictureUrl,
    });
  } catch (error) {
    next(error);
  }
};

export { me, updateProfilePicture };
