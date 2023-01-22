import { Controller, Get, Post, Body, Put, Res, Param, Delete, HttpStatus } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto, UpdateShopDto } from './dto/shop.dto';
import { Shop, ShopDocument } from './entities/shop.entity';
import { Resource, Unprotected } from 'nest-keycloak-connect';

@Controller('shop')
@Resource(Shop.name)
export class ShopController {
  private readonly service: ShopService;
  constructor(service: ShopService) {
    this.service = service;
  }

  @Post()
  async create(
    @Res()
    response: any,

    @Body()
    createDto: CreateShopDto
  ): Promise<ShopDocument> {
    const document = await this.service.create(createDto);
    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: document
    })
  }

  // same as @Public()
  @Unprotected()
  @Get(':id')
  async findById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<ShopDocument> {
    const document = await this.service.findById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }

  @Put(':id')
  async updateById(
    @Res()
    response: any,

    @Param('id')
    id: string,

    @Body()
    updateDto: UpdateShopDto) {
    const document = await this.service.updateById(id, updateDto);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }

  @Delete(':id')
  async deleteById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<ShopDocument> {
    const document = await this.service.deleteById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }
}
