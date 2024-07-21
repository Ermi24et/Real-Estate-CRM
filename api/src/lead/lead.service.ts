import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLeadDto: CreateLeadDto) {
    try {
      const newLead = await this.prisma.lead.create({
        data: {
          ...createLeadDto,
          comments: {
            create: createLeadDto.comments?.map((comment) => ({
              content: comment.content,
            })),
          },
        },
      });
      return {
        message: 'Lead created successfully!',
        data: newLead,
      };
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const allLeads = await this.prisma.lead.findMany({});
    return {
      message: 'Here is the list of all leads:',
      data: allLeads,
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        assignedTo: {
          select: {
            email: true,
          },
        },
      },
    });
    if (!data) {
      throw new NotFoundException('Lead not found');
    }
    return data;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    // check for existing lead
    const existingLead = await this.prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });
    if (!existingLead) {
      throw new NotFoundException('lead not found');
    }

    // check for existing comments
    const { comments, ...leadUpdateData } = updateLeadDto;

    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: leadUpdateData,
    });

    if (comments) {
      for (const comment of comments.filter((co) => co.id)) {
        await this.prisma.comment.update({
          where: { id: comment.id },
          data: { content: comment.content },
        });
      }

      for (const comment of comments.filter((co) => !co.id)) {
        await this.prisma.comment.create({
          data: {
            content: comment.content,
            leadId: id,
          },
        });
      }
    }
    return {
      message: 'Lead updated successfully!',
      data: updatedLead,
    };
  }

  async remove(id: string) {
    const existingLead = await this.prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        comments: true, // include comments if they exist
      },
    });

    if (!existingLead) {
      throw new NotFoundException('lead not found');
    }

    // delte all comments before deleting the lead to prevent foreign key constraint error
    await this.prisma.comment.deleteMany({
      where: {
        leadId: id,
      },
    });

    // finally delete the lead
    await this.prisma.lead.delete({
      where: { id },
    });

    return {
      message: `Lead deleted succesfully!`,
    };
  }
}
