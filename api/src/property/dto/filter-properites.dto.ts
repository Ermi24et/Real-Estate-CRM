import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterPropertiesDto {
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  minBedrooms?: number;

  @IsOptional()
  @IsNumber()
  maxBedrooms?: number;

  @IsOptional()
  @IsString()
  location?: string;
}
