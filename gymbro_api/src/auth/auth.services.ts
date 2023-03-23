import db from "../utils/db";
import hashToken from "../utils/hashToken";

const addRefreshTokenToWhiteList = (
  jti: any,
  refreshToken: string,
  userId: number
) => {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

const findRefreshTokenById = (id: string) => {
  return db.refreshToken.findUnique({ where: { id } });
};

const deleteRefreshToken = (id: string) => {
  return db.refreshToken.update({
    where: { id },
    data: {
      revoked: true,
    },
  });
};

const revokeTokens = (userId: number) => {
  return db.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
};

export {
  addRefreshTokenToWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
