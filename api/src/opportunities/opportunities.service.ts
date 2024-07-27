import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';

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
}
