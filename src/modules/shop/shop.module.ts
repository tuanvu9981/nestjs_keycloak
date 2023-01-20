import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './entities/shop.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Shop.name, schema: ShopSchema
    }]),
  ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule { }
