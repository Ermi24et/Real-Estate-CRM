import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  builtAt?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  numbersOfRoom: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  numbersOfBathRoom: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  numbersOfBedRoom: number;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  isSold: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location?: string;
}
