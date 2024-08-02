import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Injectable()
export class OpportunitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createOpportunityDto: CreateOpportunityDto) {
    return this.prisma.opportunity.create({
      data: createOpportunityDto,
    });
  }

  async findOne(id: string) {
    return this.prisma.opportunity.findUnique({
      where: { id },
      include: {
        comments: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    return this.prisma.opportunity.update({
      where: {
        id,
      },
      data: updateOpportunityDto,
    });
  }

  async delete(id: string) {
    this.prisma.opportunity.delete({
      where: { id },
    });
  }
}
