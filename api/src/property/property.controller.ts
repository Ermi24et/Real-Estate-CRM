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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './sharp.pipe';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  async test(
    @UploadedFile(SharpPipe) image: { filename: string; buffer: Buffer },
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    console.log(image);
    console.log(createPropertyDto.name);
    if (!createPropertyDto) {
      return new BadRequestException('property data is required!');
    }
    return await this.propertyService.test(createPropertyDto, image);
  }

  @Get('test')
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('minBedrooms') minBedrooms?: string,
    @Query('maxBedrooms') maxBedrooms?: string,
    @Query('location') location?: string,
  ) {
    return await this.propertyService.findAll(
      page,
      pageSize,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      location,
    );
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
