import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../users.service";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(["admin", "user"],{
        message: "valid role required"
    })
    role: Role;
}