import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @IsPhoneNumber("ID")
    phone?: string;

    @IsEmail()
    email?: string;
}
