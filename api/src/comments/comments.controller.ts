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

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Public()
@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add comments' })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('lead/:leadId')
  @ApiOperation({ summary: 'Get lead comments by Id' })
  @ApiResponse({ status: 200, description: 'Returns lead by Id' })
  @ApiResponse({ status: 404, description: 'Comment Not Found' })
  @ApiParam({ name: 'leadId', required: true, type: String })
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async getCommentForLead(
    @Param('leadId') leadId: string,
    @Query('cursor') cursor: string = '0',
    @Query('take') take: string = '10',
  ) {
    const skipNumber = parseInt(cursor, 10);
    const takeNumber = parseInt(take, 10);
    return this.commentsService.getCommentsForLead(
      leadId,
      skipNumber,
      takeNumber,
    );
  }

  @Get('opportunity/:opportunityId')
  @ApiOperation({ summary: 'Get opportunity comment by Id' })
  @ApiResponse({ status: 200, description: 'Return opportunity comment by Id' })
  @ApiResponse({ status: 404, description: 'Comment Not Found' })
  @ApiParam({ name: 'opportunityId', required: true, type: String })
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async getCommentsForOpportunity(
    @Param('opportunityId') opportunityId: string,
    @Query('cursor') cursor: string = '0',
    @Query('take') take: string = '10',
  ) {
    const skipNumber = parseInt(cursor, 10);
    const takeNumber = parseInt(take, 10);
    return this.commentsService.getCommentsForOpportunity(
      opportunityId,
      skipNumber,
      takeNumber,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comments by Id' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully' })
  @ApiResponse({ status: 404, description: 'Comment Not Found' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comments by Id' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment Not Found' })
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
