export default class TokenPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(body) {
        this.id = body.id;
        this.firstName = body.first_name;
        this.lastName = body.last_name;
        this.email = body.email;
    }
}