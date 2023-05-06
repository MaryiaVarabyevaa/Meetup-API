import { Response } from "express";
import { User } from "./user.type";

type ResponseType = Response<User> | void;

export { ResponseType };