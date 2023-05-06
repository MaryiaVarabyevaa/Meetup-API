import { ErrorMessages, StatusCodes } from '../constants';

class ApiExceptions extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError(error = ErrorMessages.UNAUTHORIZED_ERROR) {
    return new ApiExceptions(StatusCodes.UNAUTHORIZED_ERROR, error);
  }

  static BadRequest(error = ErrorMessages.INVALID_INPUT) {
    return new ApiExceptions(StatusCodes.BAD_REQUEST, error);
  }
}

export { ApiExceptions };
