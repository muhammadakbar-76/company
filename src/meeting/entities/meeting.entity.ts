import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId, IsUrl } from "class-validator";
import { SchemaTypes } from "mongoose";
import { Employee } from "../../employee/entities/employee.entity";

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {

    @Prop()
    title: string

    @Prop()
    @IsUrl()
    meetingUrl: string

    @Prop({type: [{type: SchemaTypes.ObjectId, ref: "Employee"}]})
    @IsMongoId()
    employees: Employee[]
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);