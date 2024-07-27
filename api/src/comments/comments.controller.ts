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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Public()
@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('lead/:leadId')
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
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
