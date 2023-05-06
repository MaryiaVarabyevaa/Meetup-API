import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import multer from "multer";


const multerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imagesPath = path.join(__dirname, "../../images");
  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
  }
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagesPath);
      },
      filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
      ): void => {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    })
  }).single("avatar")(req, res, function (err) {
    if (err) {
      console.log(err);
    }
    next();
  });
};


export { multerMiddleware };