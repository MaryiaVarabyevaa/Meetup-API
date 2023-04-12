import jwt from 'jsonwebtoken';
const { Token } = require('../models/token-model');

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}});
        // для обновления refresh_token в бд
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return tokenData.save();
        }
        // пользователя, который логиниться впервые
        const token = await Token.create({ userId, refresh_token: refreshToken });
        return token;
    }
}

export default new TokenService();