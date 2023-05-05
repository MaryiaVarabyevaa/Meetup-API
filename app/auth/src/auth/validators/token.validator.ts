import { Request } from "express";
import { tokensSchema } from "../schemas";

const validateToken = (req: Request) => {
  return tokensSchema(req.cookies);
}

export { validateToken };