import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [CommentsModule],
  controllers: [LeadController],
  providers: [LeadService, CommentsService],
})
export class LeadModule {}
