import { Request } from "express";
import { registrationSchema } from "../schemas";

const validateRegistration = (req: Request) => {
  return registrationSchema(req.body);
}

export { validateRegistration };