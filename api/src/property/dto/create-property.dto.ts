import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  builtAt?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  numbersOfRoom: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  numbersOfBathRoom: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  numbersOfBedRoom: number;

  @ApiProperty()
  @IsBoolean()
  isSold: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location?: string;
}
