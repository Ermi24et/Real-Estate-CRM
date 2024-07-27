import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const { content, entityId, entityType } = createCommentDto;

    if (entityType === 'lead') {
      return this.prisma.comment.create({
        data: {
          content,
          Lead: {
            connect: { id: entityId },
          },
        },
      });
    } else if (entityType === 'opportunity') {
      return this.prisma.comment.create({
        data: {
          content,
          opportunities: {
            connect: { id: entityId },
          },
        },
      });
    } else {
      throw new BadRequestException('Invalid entity type');
    }
  }

  async getCommentsForLead(
    leadId: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.prisma.comment.findMany({
      where: { leadId },
      skip: cursor,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCommentsForOpportunity(
    opportunityId: string,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.prisma.comment.findMany({
      where: { opportunityId },
      skip: cursor,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
