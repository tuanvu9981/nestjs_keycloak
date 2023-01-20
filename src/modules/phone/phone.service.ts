import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePhoneDto, UpdatePhoneDto } from './dto/phone.dto';
import { Phone, PhoneDocument } from './entities/phone.entity';

@Injectable()
export class PhoneService {
  private readonly repo: Model<Phone>;

  constructor(
    @InjectModel(Phone.name)
    repo: Model<Phone>
  ) {
    this.repo = repo;
  }

  async create(dto: CreatePhoneDto): Promise<PhoneDocument> {
    const newDocument = new this.repo(dto);
    return await newDocument.save();
  }

  async findById(id: string): Promise<PhoneDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: UpdatePhoneDto): Promise<PhoneDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<PhoneDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
