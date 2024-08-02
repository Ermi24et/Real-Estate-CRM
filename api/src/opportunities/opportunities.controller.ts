import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';
import { CommentsService } from 'src/comments/comments.service';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Public()
@Controller('opportunities')
@ApiTags('opportunities')
export class OpportunitiesController {
  constructor(
    private readonly opportunitiesService: OpportunitiesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create opportunity' })
  @ApiResponse({ status: 201, description: 'Opportunity created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Opportunity by Id' })
  @ApiResponse({ status: 200, description: 'returned opportunity by Id' })
  @ApiResponse({ status: 404, description: 'Opportunity Not Found' })
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

  @Patch(':id')
  @ApiOperation({ summary: 'Update Opportunity by Id' })
  @ApiResponse({
    status: 200,
    description: 'updated opportunity by successfully',
  })
  @ApiResponse({ status: 404, description: 'Opportunity Not Found' })
  async update(@Body() id: string, updateOpportunityDto: UpdateOpportunityDto) {
    return this.opportunitiesService.update(id, updateOpportunityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Opportunity by Id' })
  @ApiResponse({ status: 200, description: 'Deleted opportunity successfully' })
  @ApiResponse({ status: 404, description: 'Opportunity Not Found' })
  async delete(@Param() id: string) {
    return this.opportunitiesService.delete(id);
  }
}
