// controllers/property.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyId } from 'src/auth/decorator/propertyId.decorator';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createProperty(
    @Body() createProperty: CreatePropertyDto,
    @PropertyId() propertyId: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!createProperty) {
      throw new BadRequestException('Property data is required');
    }
    return await this.propertyService.createProperty(createProperty, file);
  }

  @Get()
  async findAll(@PropertyId() propertyId: string) {
    return await this.propertyService.findAll(propertyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  @Patch('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.propertyService.update(file, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }
}
