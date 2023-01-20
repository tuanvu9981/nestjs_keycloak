import { PHONE_TYPE } from "../entities/phone.entity";

export class CreatePhoneDto {
    brand: string;
    price: number;
    os: PHONE_TYPE;
    ramMemory: number;
    chipType: string;
}

export class UpdatePhoneDto extends CreatePhoneDto {}
