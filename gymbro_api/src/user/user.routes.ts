import express from "express";
import { profilePictureUpload } from "../utils/uploads";

import { me, updateProfilePicture } from "./user.controllers";

const userRouter = express.Router();

userRouter.route("/me").get(me);
userRouter.post(
  "/update_profile_picture",
  profilePictureUpload.single("profile_picture"),
  updateProfilePicture
);

export default userRouter;
