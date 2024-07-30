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
import { FilterPropertiesDto } from './dto/filter-properites.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';

@Public()
@Controller('property')
@ApiTags('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(SharpPipe) image: { filename: string; buffer: Buffer },
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    console.log(image);
    console.log(createPropertyDto.name);
    if (!createPropertyDto) {
      return new BadRequestException('property data is required!');
    }
    return await this.propertyService.uploadFile(createPropertyDto, image);
  }

  @Get('image')
  async findAll(
    @Query() filterDto: FilterPropertiesDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.propertyService.findAll(paginationDto, filterDto);
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
