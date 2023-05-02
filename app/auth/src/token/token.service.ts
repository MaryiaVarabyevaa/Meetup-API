import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenPayload } from './types/tokenPayload.type';
import { TokenPair } from './types/tokenPair.type';
import { prisma } from "../db";
import { Token } from "./types/token.type";

class TokenService {
  generateToken(payload: TokenPayload): TokenPair {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCCESS_SECRET || '', {
      expiresIn: '30m'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {
      expiresIn: '30d'
    });
    return {
      accessToken,
      refreshToken
    };
  }

  validateAccessToken(token: string): TokenPayload {
    const userData = jwt.verify(token, process.env.JWT_ACCCESS_SECRET!) as JwtPayload;
    const { id, email, role } = userData;
    return { id, email, role };
  }

  validateRefreshToken(token: string): TokenPayload {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    const { id, email, role } = userData;
    return { id, email, role };
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const tokenData = await prisma.token.findUnique({ where: { userId } });
    if (tokenData) {
      await prisma.token.update({
        where: {userId},
        data: {refreshToken}
      });
      return;
    }
    await prisma.token.create({
        data: {
          refreshToken,
          userId
        }
    })
    return;
  }

  async findRefreshToken(refreshToken: string): Promise<Token | null> {
    const tokenData = prisma.token.findUnique({ where: { refreshToken } });
    return tokenData;
  }
}

export default new TokenService();
