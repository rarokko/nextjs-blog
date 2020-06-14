export class User {
    password: String;
    username: String;
    id: String;
    email: String;

    constructor(user: User) {
        this.password = user.password;
        this.username = user.username;
        this.id = user.id;
        this.email = user.email;
    }

    getAsDynamoObject() {
        return {
            password: { S: this.password },
            username: { S: this.username },
            id: { S: this.id },
            email: { S: this.email }
        };
    }
}