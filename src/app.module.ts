import { Module } from '@nestjs/common';
import { ShopModule } from './modules/shop/shop.module';
import { PhoneModule } from './modules/phone/phone.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Authentication with Keycloak
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/.env`,
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENTID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET
    }),
    MongooseModule.forRoot(process.env.URI),
    ShopModule,
    PhoneModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
})
export class AppModule { }
