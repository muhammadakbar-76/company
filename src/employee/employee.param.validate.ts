import { IsMongoId } from "class-validator";

export class EmployeeParams {
    @IsMongoId()
    id: string;
}