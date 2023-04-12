export default class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors?: string[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'You are not authorized to access this resource')
    }

    static BadRequest(message, errors= []) {
        return new ApiError(400, message, errors)
    }
}