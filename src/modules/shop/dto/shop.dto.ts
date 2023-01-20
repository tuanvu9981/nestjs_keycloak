import { ObjectId } from "mongoose";

export class CreateShopDto {
    phones: ObjectId[];
    address: string;
    brandName: string;
}

export class UpdateShopDto extends CreateShopDto { }