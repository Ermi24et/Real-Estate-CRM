import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, FileUploadService],
  imports: [PrismaModule],
})
export class PropertyModule {}
