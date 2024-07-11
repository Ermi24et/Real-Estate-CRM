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
