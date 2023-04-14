import userService from "../services/user-service";

class UserController {
    async registration(req, res, next) {
        try {
            const userData = await userService.registration(req.validatedData);
            // срок хранения куки 30 дней
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(201).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookie;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async changeUserRole(req, res, next) {
        try {
            const { id } = req.params;
            const organizer = await userService.changeUserRole(id);
            return res.status(200).json(organizer);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();