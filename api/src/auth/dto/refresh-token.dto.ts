import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({
    description: 'Refresh token for generating a new access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI3MDE0Yzg4MC04NzkzLTQ2M2MtOWIyYy0xYzIwNWZkNGM2OGUiLCJpYXQiOjE3MjE3NDg5NjcsImV4cCI6MTcyMjM1Mzc2N30.8d0eXdRBgRVs9SnAUnECtKt4Y3eqvEt627FHeHVmPJw',
  })
  refreshToken: string;
}
