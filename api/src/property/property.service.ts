import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertyService {
  logger = new Logger(PropertyService.name);
  constructor(private prisma: PrismaService) {}
  async createProperty(data: CreatePropertyDto) {
    try {
      const existingProperty = await this.prisma.property.findUnique({
        where: {
          name: data.name,
        },
      });

      if (existingProperty) {
        throw new ConflictException('this item already exists');
      }

      const newProperty = await this.prisma.property.create({
        data,
      });

      return {
        data: newProperty,
        message: 'property created succesffully',
      };
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findAll() {
    const properties = await this.prisma.property.findMany({});

    return properties;
  }

  async findOne(id: string) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      throw new NotFoundException('this item is not found');
    }
    return this.prisma.property.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdatePropertyDto) {
    const updatedData = await this.prisma.property.update({
      where: {
        id,
      },
      data,
    });

    return {
      updatedData,
    };
  }

  async remove(id: string) {
    await this.prisma.property.delete({
      where: {
        id,
      },
    });

    return {
      message: 'data deleted success',
    };
  }
}
