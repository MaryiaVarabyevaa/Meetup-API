export enum ErrorMessages {
    USER_FORBIDDEN = 'The function you are trying to access is not available for your current role or ID.',
    MEETUP_NOT_FOUNT = 'The meetup with the ID you provided does not exist in the database',
    MEETUP_CONFLICT = 'The record of meetup you are trying to create already exists in the database.',
    USER_CONFLICT = 'The email address you are trying to register with is already associated with an existing account in the system.',
    USER_INVALID_DATA = 'Invalid email or password. Please check your credentials and try again.',
    USER_NOT_FOUND = 'The user you are trying to access or perform an action on could not be found in the system.',
    INVALID_TOKEN = 'Please provide a valid refresh token to access the requested resource.',
    VALIDATION_DATE_ERROR = 'Date should not be less than the current one'
}