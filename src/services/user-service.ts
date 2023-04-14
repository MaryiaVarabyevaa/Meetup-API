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
        const payload = new TokenPayload(user);
        const tokens = tokenService.generateToken({...payload});
        return { ...tokens };
    }

    async registration(userDto: CreateUser): Promise<TokenPair> {
        const { email, password, firstName, lastName } = userDto;
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.BadRequest(`A user with ${email} email already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({email, password: hashPassword, first_name: firstName, last_name: lastName});
        return this.generateTokens(user);
    }

    async login(email: string, password: string): Promise<TokenPair> {
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
    }

    async refresh(refreshToken: string): Promise<TokenPair> {
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
    }

    async changeUserRole(id: number): Promise<void> {
        const user = await User.findOne({where: {id}});
        if (!user) {
            throw ApiError.NotFound();
        }
        const { role} = user;
        const newRole = UserRole.USER === role? UserRole.ORGANIZER : UserRole.USER;
        await user.update( { role: newRole });
        await user.save();
        return;
    }
}

export default new UserService();