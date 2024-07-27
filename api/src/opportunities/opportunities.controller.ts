import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';
import { CommentsService } from 'src/comments/comments.service';

@Public()
@Controller('opportunities')
@ApiTags('opportunities')
export class OpportunitiesController {
  constructor(
    private readonly opportunitiesService: OpportunitiesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  async create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('cursor') cursor?: number,
    @Query('take') take: number = 10,
  ) {
    const opportunity = await this.opportunitiesService.findOne(id);
    const comments = await this.commentsService.getCommentsForOpportunity(
      id,
      cursor,
      take,
    );
    return { ...opportunity, comments };
  }
}
