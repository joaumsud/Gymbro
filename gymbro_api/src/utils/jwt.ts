import jwt from "jsonwebtoken";

import { User } from "../types/user";

const generateAcessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, {
    expiresIn: "20m",
  });
};

const generateRefreshToken = (user: User, jti: string) => {
  return jwt.sign({ userId: user.id, jti }, process.env.SECRET_KEY!, {
    expiresIn: "8h",
  });
};

const generateTokens = (user: User, jti: string) => {
  const acessToken = generateAcessToken(user);
  const refreshToken = generateRefreshToken(user, jti);
  return [acessToken, refreshToken];
};

export default {
  generateAcessToken,
  generateRefreshToken,
  generateTokens,
};
