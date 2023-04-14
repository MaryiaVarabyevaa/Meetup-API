export default class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors?: string[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'You are not authorized to access this resource');
    }

    static BadRequest(message, errors= []) {
        return new ApiError(400, message, errors);
    }

    static Forbidden() {
        return new ApiError(403, 'Access to the requested resource is forbidden for your user role or ID.');
    }

    static NotFound() {
        return new ApiError(404, 'The requested resource could not be found on the server.')
    }

    static Conflict() {
        return new ApiError(409, 'Meetup already exists');
    }
}