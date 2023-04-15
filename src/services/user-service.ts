import bcrypt from 'bcrypt';
import {CreateUser} from "../types/CreateUser";
import tokenService from "../services/token-service";
import ApiError from "../exceptions/api-error";
import TokenPayload from "../utils/jwtUtils";
import {UserRole} from "../constants/userRoles";
import {TokenPair} from "../types/TokenPair";

const { User } = require('../models/user-model');

class UserService {
    private async generateTokens(user): Promise<TokenPair> {
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
                throw ApiError.BadRequest(`A user with ${email} email already exists`);
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
                throw ApiError.BadRequest('Invalid email or password. Please check your credentials and try again.');
            }
            const {password: userPassword} = user;
            const isPasswordEquals = await bcrypt.compare(password, userPassword as string);
            if (!isPasswordEquals) {
                throw ApiError.BadRequest('Invalid email or password. Please check your credentials and try again.')
            }
            return this.generateTokens(user);
        } catch (err) {
            throw err;
        }
    }

    async refresh(refreshToken: string): Promise<TokenPair> {
        try {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }

            const user = await User.findOne({where: {id: userData.id}});
            return this.generateTokens(user);
        } catch (err) {
            throw err;
        }
    }

    async changeUserRole(id: number): Promise<void> {
        try {
            const user = await User.findOne({where: {id}});
            if (!user) {
                throw ApiError.NotFound();
            }
            const { role} = user;
            const newRole = UserRole.USER === role? UserRole.ORGANIZER : UserRole.USER;
            await user.update( { role: newRole });
            await user.save();
            return;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();