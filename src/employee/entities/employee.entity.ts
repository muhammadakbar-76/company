import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes,Types } from "mongoose";
import { Task } from "../../task/entities/task.entity";
import { Contact } from "../../contact/entities/contact.entity";

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {

    @Prop()
    name: string;

    @Prop({type: SchemaTypes.ObjectId,ref: "Contact"})
    contact: Contact

    @Prop({ type: [{type: Types.ObjectId, ref: Task.name}] })
    tasksId: Task[]

    @Prop({type: SchemaTypes.ObjectId,ref: "Employee"})
    manager: Employee
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);