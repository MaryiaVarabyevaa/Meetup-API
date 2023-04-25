import jwt, {JwtPayload} from 'jsonwebtoken';
import {TokenPayload} from "../types/TokenPayload";
import {TokenPair} from "../types/TokenPair";
import {MigrationTokenResult} from "../types/MigrationTokenResult";
import Token from "../models/token-model";

class TokenService {
    generateToken(payload: TokenPayload): TokenPair {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCCESS_SECRET || '', { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string): TokenPayload | null {
        const userData = jwt.verify(token, process.env.JWT_ACCCESS_SECRET as string) as JwtPayload;
        const { id, email, role } = userData;
        return { id, email, role };
    }

    validateRefreshToken(token: string): TokenPayload | null {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
        const { id, email, role } = userData;
        return { id, email, role };
    }

    async saveToken(userId: number, refreshToken: string): Promise<MigrationTokenResult | void> {
        const tokenData = await Token.findOne({where: {userId}});
        // для обновления refresh_token в бд
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            await tokenData.save();
            return;
        }
        // пользователя, который логиниться впервые
        const token = await Token.create({ userId, refresh_token: refreshToken }) as MigrationTokenResult;
        return token;
    }

    async findToken(refreshToken: string): Promise<MigrationTokenResult> {
        const tokenData = await Token.findOne({where : {refresh_token: refreshToken}}) as MigrationTokenResult;
        return tokenData;
    }
}

export default new TokenService();