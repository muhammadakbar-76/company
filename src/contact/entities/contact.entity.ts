import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    email: string
}

export const ContactSchema = SchemaFactory.createForClass(Contact);