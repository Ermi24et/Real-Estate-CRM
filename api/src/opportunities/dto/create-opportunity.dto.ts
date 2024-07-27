import { ApiProperty } from '@nestjs/swagger';
import { Stage } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOpportunityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Stage)
  stage: Stage;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  probability?: number;

  @ApiProperty()
  @IsOptional()
  expectedCloseDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  estimatedValue?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  leadId: string;
}
