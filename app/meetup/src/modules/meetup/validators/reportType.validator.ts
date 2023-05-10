import { Request } from "express";
import { reportTypeSchema } from "../schemas";
import { ParamsReport } from "../types";


const validateReport = (req: Request) => {
  const paramsReport: ParamsReport = { type: req.params.type };
  return reportTypeSchema(paramsReport);
}

export { validateReport };