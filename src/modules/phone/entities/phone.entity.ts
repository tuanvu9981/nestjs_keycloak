import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PhoneDocument = Phone & Document;

export enum PHONE_TYPE {
    ANDROID = "android",
    IOS = "ios"
}

@Schema({ versionKey: false })
export class Phone {
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, enum: PHONE_TYPE })
    os: PHONE_TYPE;

    @Prop()
    ramMemory: number;

    @Prop()
    chipType: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);

