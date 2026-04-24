import multer from "multer";

const storage=multer.memoryStorage();

const uploadFile=multer({storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image") ||
      file.mimetype.startsWith("video")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos allowed"));
    }
  },
}).single("file");

export default uploadFile;