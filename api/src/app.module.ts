import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PropertyModule } from './property/property.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileUploadProvider } from './file-upload/cloudinary-provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    PrismaModule,
    UsersModule,
    PropertyModule,
    AuthModule,
    MailModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileUploadProvider],
})
export class AppModule {}
