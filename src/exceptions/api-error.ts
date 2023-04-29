export default class ApiError extends Error {
    status;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    static UnauthorizedError(message: string) {
        return new ApiError(401, message);
    }

    static Forbidden(message: string) {
        return new ApiError(403, message);
    }

    static NotFound(message: string) {
        return new ApiError(404, message)
    }

    static Conflict(message: string) {
        return new ApiError(409, message);
    }
}