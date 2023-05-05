import { Request } from "express";
import { googleCallbackSchema } from "../schemas";

const validateGoogleCallback = (req: Request) => {
  return googleCallbackSchema(req.body);
}

export { validateGoogleCallback };