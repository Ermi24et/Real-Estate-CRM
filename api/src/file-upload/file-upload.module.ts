import { Module } from '@nestjs/common';
import { FileUploadProvider } from './cloudinary-provider';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [FileUploadService, FileUploadProvider],
  exports: [FileUploadService, FileUploadProvider],
})
export class FileUploadModule {}
