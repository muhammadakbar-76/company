import { IsArray, IsEmail, IsMongoId, IsOptional, IsPhoneNumber, Validate } from "class-validator";
import { Task } from "../../task/entities/task.entity";

export class CreateEmployeeDto {
    name: string;

    @IsPhoneNumber("ID")
    phone: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsMongoId()
    manager ?: string;

    @IsOptional()
    @IsArray()
    @Validate(IsMongoId, {
        each: true,
    })
    task ?: Task[];
}
