import { Module } from '@nestjs/common';
import { ShopModule } from './modules/shop/shop.module';
import { PhoneModule } from './modules/phone/phone.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/.env`,
    }),
    MongooseModule.forRoot(process.env.URI),
    ShopModule,
    PhoneModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
