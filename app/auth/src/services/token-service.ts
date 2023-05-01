import jwt, {JwtPayload} from 'jsonwebtoken';
import Token from "../db/models/token-model";


class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCCESS_SECRET || '', { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    const userData = jwt.verify(token, process.env.JWT_ACCCESS_SECRET as string) as JwtPayload;
    const { id, email, role } = userData;
    return { id, email, role };
  }

  validateRefreshToken(token: string) {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    const { id, email, role } = userData;
    return { id, email, role };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await Token.findOne({where: {userId}});
    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      await tokenData.save();
      return;
    }
    const token = await Token.create({ userId, refresh_token: refreshToken });
    return token;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({where : {refresh_token: refreshToken}});
    return tokenData;
  }
}

export default new TokenService();