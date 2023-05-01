export enum ErrorMessages {
  USER_CONFLICT = 'The email address you are trying to register with is already associated with an existing account in the system.',
  USER_INVALID_DATA = 'Invalid email or password. Please check your credentials and try again.',
  USER_NOT_FOUND = 'The user you are trying to access or perform an action on could not be found in the system.',
  INVALID_TOKEN = 'Please provide a valid refresh token to access the requested resource.',
  UNEXPECTED_ERROR = 'An unexpected error occurred while processing your request. Please try again later.'
}