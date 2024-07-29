import { IsNumber, IsString } from 'class-validator';

export class OtpDto {
  @IsNumber()
  code: number;

  @IsString()
  userId: string;
}
