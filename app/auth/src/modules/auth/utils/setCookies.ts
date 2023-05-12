import { Response } from 'express';
import { accessCookieExpiration, refreshCookieExpiration } from '../constants';
import { TokenPair } from "../../token/types";

const setCookies = (res: Response, user: TokenPair): void => {
  res.cookie('refreshToken', user.refreshToken, {
    expires: refreshCookieExpiration,
    httpOnly: true,
  });
  res.cookie('accessToken', user.accessToken, { expires: accessCookieExpiration, httpOnly: true });
};

export { setCookies };
