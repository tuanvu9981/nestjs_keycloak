import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Phone } from "src/modules/phone/entities/phone.entity";

export type ShopDocument = Shop & Document;

@Schema({ versionKey: false })
export class Shop {
    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phone' }],
    })
    phones: ObjectId[];

    @Prop()
    address: string;

    @Prop()
    brandName: string;

}

export const ShopSchema = SchemaFactory.createForClass(Shop);
