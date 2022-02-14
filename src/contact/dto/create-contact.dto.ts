import { IsEmail, IsPhoneNumber } from "class-validator";

export class CreateContactDto {
    @IsPhoneNumber("ID")
    phone: string;

    @IsEmail()
    email: string;
}
