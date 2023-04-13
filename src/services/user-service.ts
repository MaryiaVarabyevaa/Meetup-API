import bcrypt from 'bcrypt';
import {CreateUser} from "../types/CreateUser";
import tokenService from "../services/token-service";
import ApiError from "../exceptions/api-error";
import TokenPayload from "../utils/jwtUtils";
import {UserRole} from "../constants/userRoles";

const { User } = require('../models/user-model');

class UserService {
    async registration(userDto: CreateUser) {
        const { email, password, firstName, lastName } = userDto;
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.BadRequest(`A user with ${email} email already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({email, password: hashPassword, first_name: firstName, last_name: lastName});
        const payload = new TokenPayload(user);
        const tokens = tokenService.generateToken({...payload});
        await tokenService.saveToken(payload.id, tokens.refreshToken);

        return {
            ...tokens,
            user: payload
        }
    }

    async login(email: string, password: string) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.BadRequest('Invalid email or password. Please check your credentials and try again.');
        }
        const isPasswordEquals = bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Invalid email or password. Please check your credentials and try again.')
        }
        const payload = new TokenPayload(user);
        const tokens = tokenService.generateToken({...payload});
        await tokenService.saveToken(payload.id, tokens.refreshToken);

        return {
            ...tokens,
            user: payload
        }
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findOne({where: {id: userData.id}})
        const payload = new TokenPayload(user);
        const tokens = tokenService.generateToken({...payload});
        await tokenService.saveToken(payload.id, tokens.refreshToken);

        return {
            ...tokens,
            user: payload
        }
    }

    async changeUserRole(id: number) {
        const user = await User.findOne({where: {id}});
        if (!user) {
            throw ApiError.NotFound();
        }
        const role = UserRole.USER === user.role? UserRole.ORGANIZER : UserRole.USER;
        const organizer = User.update({role}, {where: {id}});
        return organizer;
    }
}

export default new UserService();