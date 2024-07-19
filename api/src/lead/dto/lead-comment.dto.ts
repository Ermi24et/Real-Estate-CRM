import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LeadCommentDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  content: string;
}
