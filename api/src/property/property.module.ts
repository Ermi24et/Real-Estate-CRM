import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [PrismaModule],
})
export class PropertyModule {}
