import userService from "../services/user-service";

class UserController {
    async registration(req, res, next) {
        try {
            const userData = await userService.registration(req.body);
            // срок хранения куки 30 дней
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (err) {
            console.log(err);
        }
    }

    async login(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (err) {

        }
    }
}

export default new UserController();