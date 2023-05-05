import express from "express";
import tokenService from "../token/token.service";

const authenticateJWT = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    const data = await tokenService.validateAccessToken(accessToken);
    req.user = data;
    next();
  }
};

export { authenticateJWT };