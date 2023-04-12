import bcrypt from 'bcrypt';
import {CreateUser} from "../types/CreateUser";
const { User } = require('../models/user-model');
import tokenService from "../services/token-service";
import NewUserDto from "../dtos/new-user.dto";
import ApiError from "../exceptions/api-error";

class UserService {
    async registration(userDto: CreateUser) {
        const { email, password, firstName, lastName } = userDto;
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.BadRequest(`A user with ${email} email already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({email, password: hashPassword, first_name: firstName, last_name: lastName});
        const newUserDto = new NewUserDto(user);
        const tokens = tokenService.generateToken({...newUserDto});
        await tokenService.saveToken(newUserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: newUserDto
        }
    }
}

export default new UserService();