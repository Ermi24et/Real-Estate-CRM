import { Module } from '@nestjs/common';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [CommentsModule],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService, CommentsService],
})
export class OpportunitiesModule {}
