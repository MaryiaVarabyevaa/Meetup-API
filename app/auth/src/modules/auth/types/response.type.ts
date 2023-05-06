import { Response } from "express";
import { TokenPair } from "../../token/types";

type ResponseType = Response<TokenPair> | void;

export { ResponseType };