import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { CreatePhoneDto, UpdatePhoneDto } from './dto/phone.dto';
import { Phone, PhoneDocument } from './entities/phone.entity';
import { Resource, Roles } from 'nest-keycloak-connect';

@Controller('phone')
@Resource(Phone.name)
export class PhoneController {
  private readonly service: PhoneService;
  constructor(service: PhoneService) {
    this.service = service;
  }

  @Post()
  @Roles({ roles: ['admin'] })
  async create(
    @Res()
    response: any,

    @Body()
    createDto: CreatePhoneDto
  ): Promise<PhoneDocument> {
    const document = await this.service.create(createDto);
    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: document
    })
  }

  @Get(':id')
  @Roles({ roles: ['user', 'admin'] })
  async findById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<PhoneDocument> {
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
    updateDto: UpdatePhoneDto) {
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
  ): Promise<PhoneDocument> {
    const document = await this.service.deleteById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }
}
