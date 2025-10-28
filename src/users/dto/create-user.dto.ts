export class CreateUserDto {
    createAt?: Date;
    name?: string;          
    avatar?: string;
    username: string;
    password: string;
    isFlag?: boolean;
    role : string;
}
