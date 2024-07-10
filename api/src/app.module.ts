import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PropertyModule } from './property/property.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadProvider } from './file-upload/cloudinary-provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
