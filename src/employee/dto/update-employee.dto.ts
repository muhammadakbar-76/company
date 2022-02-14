import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsEmail, IsMongoId, IsPhoneNumber } from 'class-validator';
import { Task } from '../../task/entities/task.entity';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    name?: string;

    @IsPhoneNumber("ID")
    phone?: string;

    @IsEmail()
    email?: string;
    
    @IsMongoId()
    manager?: string;

    @IsArray()
    task?: Task[];
}
