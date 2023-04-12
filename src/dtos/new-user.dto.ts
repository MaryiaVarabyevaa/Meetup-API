export default class NewUserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(model) {
        this.id = model.id;
        this.firstName = model.first_name;
        this.lastName = model.last_name;
        this.email = model.email;
    }
}