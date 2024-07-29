import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Prisma } from '@prisma/client';
import { FilterPropertiesDto } from './dto/filter-properites.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PropertyService {
  logger = new Logger(PropertyService.name);

  constructor(
    private prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async uploadFile(
    createPropertyDto: CreatePropertyDto,
    file: { filename: string; buffer: Buffer },
  ) {
    let uploadResult = null;

    if (file) {
      uploadResult = await this.fileUploadService.uploadImage(file);
    }

    const property = await this.prisma.property.create({
      data: {
        ...createPropertyDto,
        images: {
          create: uploadResult
            ? [
                {
                  url: uploadResult.secure_url,
                  publicId: uploadResult.public_id,
                },
              ]
            : [],
        },
      },
    });

    return property;
  }

  async findAll(paginationDto: PaginationDto, filterDto: FilterPropertiesDto) {
    const { page, pageSize } = paginationDto;
    const { minPrice, maxPrice, minBedrooms, maxBedrooms, location } =
      filterDto;
    const skip = (page - 1) * pageSize;
    const where = {
      price: {
        gte: minPrice || 0,
        lte: maxPrice || 9999999,
      },
      numbersOfBedRoom: {
        gte: minBedrooms || 0,
        lte: maxBedrooms || 10,
      },
      location: {
        contains: location || undefined,
      },
    };
    const orderBy: Prisma.PropertyOrderByWithRelationInput = {
      name: Prisma.SortOrder.asc,
    };
    return this.prisma.property.findMany({
      skip,
      take: pageSize,
      where,
      orderBy,
    });
  }

  async findOne(id: string) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingProperty) {
      throw new NotFoundException('This property is not found');
    }

    return existingProperty;
  }

  async update(file: Express.Multer.File, id: string) {
    let uploadResult = null;

    if (file) {
      uploadResult = await this.fileUploadService.uploadImage(file);
    }

    const existingProperty = await this.prisma.property.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingProperty) {
      throw new NotFoundException('This property is not found');
    }

    const updatedData = await this.prisma.property.update({
      where: { id },
      data: {
        images: uploadResult
          ? {
              upsert: existingProperty.images.map((image) => ({
                where: { id: image.id.toString() },
                update: {
                  url: uploadResult.secure_url,
                  publicId: uploadResult.public_id,
                },
                create: {
                  url: uploadResult.secure_url,
                  publicId: uploadResult.public_id,
                },
              })),
            }
          : undefined,
      },
    });

    return updatedData;
  }

  async remove(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('This property is not found');
    }

    await this.prisma.property.delete({
      where: { id },
    });

    return {
      message: 'Property deleted successfully',
    };
  }
}
