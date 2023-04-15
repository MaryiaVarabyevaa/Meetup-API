import jwt, {JwtPayload} from 'jsonwebtoken';
import {TokenPayload} from "../types/TokenPayload";
import {TokenPair} from "../types/TokenPair";
import {MigrationTokenResult} from "../types/MigrationTokenResult";

const { Token } = require('../models/token-model');

class TokenService {
    generateToken(payload: TokenPayload): TokenPair {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCCESS_SECRET, { expiresIn: '30m' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
            return {
                accessToken,
                refreshToken
            }
        } catch (err) {
            throw err;
        }
    }

    validateAccessToken(token: string): TokenPayload | null {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCCESS_SECRET) as JwtPayload;
            const { id, email, role } = userData;
            return { id, email, role };
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): TokenPayload | null {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
            const { id, email, role } = userData;
            return { id, email, role };
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken): Promise<MigrationTokenResult | void> {
        try {
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
        } catch (err) {
            throw err;
        }
    }

    async findToken(refreshToken: string): Promise<MigrationTokenResult> {
        try {
            const tokenData = await Token.findOne({where : {refresh_token: refreshToken}}) as MigrationTokenResult;
            return tokenData;
        } catch (err) {
            throw err;
        }
    }
}

export default new TokenService();