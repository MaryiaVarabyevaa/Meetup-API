import { Response } from "express";
import { accessCookieExpiration, refreshCookieExpiration } from "../constants";
import { Tokens } from "../types";

const setCookies = (res: Response, user: Tokens): void => {
  res.cookie('refreshToken', user.refreshToken, { expires: refreshCookieExpiration, httpOnly: true });
  res.cookie('accessToken', user.accessToken, { expires: accessCookieExpiration, httpOnly: true });
}

export { setCookies };