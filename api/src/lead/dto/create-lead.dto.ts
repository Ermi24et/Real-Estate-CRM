import { ApiProperty } from '@nestjs/swagger';
import { Source } from '@prisma/client';
// import { Type } from 'class-transformer';
import {
  // IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  // ValidateNested,
} from 'class-validator';
// import { LeadCommentDto } from './lead-comment.dto';

export class CreateLeadDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsEnum(Source)
  source: Source;

  @ApiProperty()
  @IsString()
  status: string;

  // @ApiProperty()
  // @IsArray()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => LeadCommentDto)
  // comments?: LeadCommentDto[];

  @ApiProperty()
  @IsString()
  assignedToId: string;
}
