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
import { LeadModule } from './lead/lead.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { JwtGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    PrismaModule,
    UsersModule,
    PropertyModule,
    AuthModule,
    MailModule,
    FileUploadModule,
    LeadModule,
    CommentsModule,
    OpportunitiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtGuard },
    JwtStrategy,
    FileUploadProvider,
  ],
})
export class AppModule {}
