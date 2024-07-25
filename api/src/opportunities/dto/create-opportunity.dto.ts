import { Stage } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOpportunityDto {
  @IsNotEmpty()
  @IsEnum(Stage)
  stage: Stage;

  @IsOptional()
  @IsNumber()
  probability?: number;

  @IsOptional()
  expectedCloseDate?: Date;

  @IsOptional()
  @IsNumber()
  estimatedValue?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  leadId: string;
}
