import { Request } from "express";
import { loginSchema } from "../schemas";

const validateLogin = (req: Request) => {
  return loginSchema(req.body);
}

export { validateLogin };