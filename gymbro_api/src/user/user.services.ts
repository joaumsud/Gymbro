import bcrypt from "bcrypt";
import { UserSignup } from "../types/user";

import db from "../utils/db";

const findUserByEmail = (email: string) => {
  return db.user.findUnique({ where: { email } });
};

const findUserById = (id: number) => {
  return db.user.findUnique({ where: { id } });
};

const createUser = (newUser: UserSignup) => {
  return db.user.create({
    data: { ...newUser, password: bcrypt.hashSync(newUser.password, 10) },
  });
};

const checkUserPassword = (inputPassword: string, userPassword: string) => {
  return bcrypt.compare(inputPassword, userPassword);
};

export { findUserByEmail, findUserById, createUser, checkUserPassword };
