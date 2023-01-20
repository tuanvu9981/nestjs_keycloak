import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateShopDto, UpdateShopDto } from './dto/shop.dto';
import { Shop, ShopDocument } from './entities/shop.entity';

@Injectable()
export class ShopService {
  private readonly repo: Model<Shop>;

  constructor(
    @InjectModel(Shop.name)
    repo: Model<Shop>
  ) {
    this.repo = repo;
  }

  async create(dto: CreateShopDto): Promise<ShopDocument> {
    const newDocument = new this.repo(dto);
    return await newDocument.save();
  }

  async findById(id: string): Promise<ShopDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    const unhandledDocument = await this.repo.findById(objId);
    return await unhandledDocument.populate('phones');
  }

  async updateById(id: string, updateDto: UpdateShopDto): Promise<ShopDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<ShopDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
