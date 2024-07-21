import { IsOptional, IsString } from 'class-validator';

export class LeadCommentDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  content: string;
}
