import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PropertyService {
  logger = new Logger(PropertyService.name);

  constructor(
    private prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async test(
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

  async findAll(
    page: number,
    pageSize: string,
    minPrice?: string,
    maxPrice?: string,
    minBedrooms?: string,
    maxBedrooms?: string,
    location?: string,
  ) {
    const skip = (page - 1) * parseInt(pageSize);
    const where = {
      price: {
        gte: parseInt(minPrice) || 0,
        lte: parseInt(maxPrice) || 9999999,
      },
      numbersOfBedRoom: {
        gte: parseInt(minBedrooms) || 0,
        lte: parseInt(maxBedrooms) || 10,
      },
      location: {
        contains: location || '',
      },
    };
    const orderBy: Prisma.PropertyOrderByWithRelationInput = {
      name: Prisma.SortOrder.asc,
    };
    return this.prisma.property.findMany({
      skip,
      take: parseInt(pageSize),
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
              upsert: {
                where: { id: existingProperty.images[0]?.id || 0 }, // Assuming the first image for simplicity
                update: {
                  url: uploadResult.secure_url,
                  publicId: uploadResult.public_id,
                },
                create: {
                  url: uploadResult.secure_url,
                  publicId: uploadResult.public_id,
                },
              },
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
