import bcrypt from 'bcrypt';
import {CreateUser} from "../types/CreateUser";
import tokenService from "../services/token-service";
import ApiError from "../exceptions/api-error";
import TokenPayload from "../utils/jwtUtils";
import {UserRole} from "../constants/userRoles";
import {TokenPair} from "../types/TokenPair";
import {ErrorMessages} from "../constants/errorMessages";
import {UserType} from "../types/User";

const { User } = require('../models/user-model');

class UserService {
    private async generateTokens(user: UserType): Promise<TokenPair> {
        try {
            const payload = new TokenPayload(user);
            const tokens = tokenService.generateToken({...payload});
            await tokenService.saveToken(user.id, tokens.refreshToken);
            return { ...tokens };
        } catch (err) {
            throw err;
        }
    }

    async registration(userDto: CreateUser): Promise<TokenPair> {
        try {
            const { email, password, firstName, lastName } = userDto;
            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                throw ApiError.Conflict(ErrorMessages.USER_CONFLICT);
            }
            const hashPassword = await bcrypt.hash(password, 3);
            const user = await User.create({email, password: hashPassword, first_name: firstName, last_name: lastName});
            return this.generateTokens(user);
        } catch (err) {
            throw err;
        }
    }

    async login(email: string, password: string): Promise<TokenPair> {
        try {
            const user = await User.findOne({where: {email}});
            if (!user) {
                throw ApiError.UnauthorizedError(ErrorMessages.USER_INVALID_DATA);
            }
            const {password: userPassword} = user;
            const isPasswordEquals = await bcrypt.compare(password, userPassword as string);
            if (!isPasswordEquals) {
                throw ApiError.UnauthorizedError(ErrorMessages.USER_INVALID_DATA);
            }
            return this.generateTokens(user);
        } catch (err) {
            throw err;
        }
    }

    async refresh(refreshToken: string): Promise<TokenPair> {
        try {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError(ErrorMessages.INVALID_TOKEN);
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError(ErrorMessages.INVALID_TOKEN);
            }
            const user = await User.findOne({where: {id: userData.id}});
            return this.generateTokens(user);
        } catch (err) {
            throw err;
        }
    }

    async changeUserRole(id: number): Promise<TokenPair> {
        try {
            const user = await User.findOne({where: {id}});
            if (!user) {
                throw ApiError.NotFound(ErrorMessages.USER_NOT_FOUND);
            }
            const { role} = user;
            const newRole = UserRole.USER === role? UserRole.ORGANIZER : UserRole.USER;
            await user.update( { role: newRole });
            const updatedUser = await user.save();
            return this.generateTokens(updatedUser);
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();