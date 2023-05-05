import { Request } from "express";
import { googleSchema } from "../schemas";

const validateGoogle = (req: Request) => {
  return googleSchema(req.body);
};

export { validateGoogle };