## NestJS Application with Keycloak Authentication

### Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Keycloak settings instructions (Vietnamese)
1. Tuân theo hướng dẫn cài đặt trên trang web chính thức của Keycloak [(Getting started)](https://www.keycloak.org/getting-started/getting-started-zip), chọn openJDK. 
    - Tạo 1 user như là 1 main user (master) quản lý mọi realm. 
    - Tạo 1 realm (tương đương workspace), không dùng realm master 
        - VD: "nestjs_keycloak"
    - Tạo 1 user trong realm
    - Tạo 1 client (client tương đương 1 app cần đến dịch vụ auth của Keycloak) 
        - VD: clientId = nestjs_keycloak_app

2. Kết nối Keycloak và Nestjs 
    - Download npm packages **keycloak-connect** và **nest-keycloak-connect**
        ```
        nestjs_keycloak $ npm i keycloak-connect
        nestjs_keycloak $ npm i nest-keycloak-connect
        ```
    - Trong **app.modules.ts**, import các class cần thiết, tạo các config như sau
        ```
        import { ConfigModule } from '@nestjs/config';

        // Authentication with Keycloak
        import { APP_GUARD } from '@nestjs/core';
        import { KeycloakConnectModule } from 'nest-keycloak-connect';

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
            ],
        })
        export class AppModule { }
        ``` 
        - **Lưu ý**: Với bản keycloak mới nhất (ngày 23 tháng 1 năm 2023) - Keycloak 20.0.3 thì **authServerUrl: 'http://localhost:8080'**, không phải authServerUrl: 'http://localhost:8080/auth' như những phiên bản trước đó.

3. Set role của users
    - Trong realm **nestjs_keycloak**
        - Chọn **Clients > nestjs_keycloak_app > Tab Roles**, click **Create Role**, tạo các role tương ứng như **admin** và **user**.
        - Chọn **Users > {user_name} > Tab Role Mapping**, click **Assign Role**, chọn các role gán cho user cụ thể trong realm

4. Lấy access token từ keycloak bằng postman 
    - Method: Post 
    - Url: http://localhost:8080/realms/{realm_name}/protocol/openid-connect/token
        - VD: http://localhost:8080/realms/nestjs_keycloak/protocol/openid-connect/token
    - Tham số: chọn Tab **Body**, phần **x-www-form-urlencoded**, điền các thông tin còn thiếu như: 
        + username
        + password 
        + client_id 
        + client_secret
        + grant_type

    - **Kết quả**: Nhận lại access token, set expired time trong keycloak. (grant type là direct access) 

    - Với email ??? 

5. Sử dụng các Decorator
- Áp dụng **APP_GUARD** cho toàn bộ project trong **app.module.ts**
    ```
    import { APP_GUARD } from '@nestjs/core';
    import {
        ResourceGuard,
        RoleGuard,
        AuthGuard,
    } from 'nest-keycloak-connect';

    @Module({
        imports: [ ... ],
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
    ```

- Dưới **@Controller** trong các file **...controller.ts**, thêm @Resource({Classname}.name)
    ```
    @Controller('shop')
    @Resource(Shop.name)
    ```

- Dưới @Get, @Post, @Put, @Delete ... trong các file **...controller.ts**, thêm các Decorator
    - **@Unprotected()** và **@Public**: API không được bảo vệ, có thể truy cập bởi cả người dùng không được xác thực (chưa đăng nhập)
    - **@Roles({ roles: ['user', 'admin'] })**: API được bảo vệ, chỉ áp dụng cho 2 role "user" và "admin". Nếu có role khác thì dù có đăng nhập cũng không thể truy cập được API này 