import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';
import { CommentsService } from 'src/comments/comments.service';

@Controller('lead')
@ApiTags('lead')
@Public()
export class LeadController {
  constructor(
    private readonly leadService: LeadService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({ status: 201, description: 'Lead created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leads' })
  @ApiResponse({ status: 200, description: 'Returns all leads.' })
  async findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lead by ID' })
  @ApiResponse({ status: 200, description: 'Return the lead.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  async findOne(
    @Param('id') id: string,
    @Query('cursor') cursor?: number,
    @Query('take') take: number = 10,
  ) {
    const lead = await this.leadService.findOne(id);
    const comments = await this.commentsService.getCommentsForLead(
      id,
      cursor,
      take,
    );
    return { ...lead, comments };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lead by ID' })
  @ApiResponse({ status: 200, description: 'Lead updated successfully.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  async update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lead by ID' })
  @ApiResponse({ status: 200, description: 'Lead deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  async remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }
}
