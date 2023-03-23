import multer from "multer";
import path from "path";

const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profile_pictures/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueSuffix + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});

const profilePictureUpload = multer({
  storage: profilePictureStorage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Apenas os formatos .png, .jpg e .jpeg são permitidos")
      );
    }
  },
});

export { profilePictureUpload };
