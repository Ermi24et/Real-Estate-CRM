import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorator/public.decorator';
import { LoginDto } from './dto';
import { OtpDto } from 'src/users/dto/otp.dto';
import { AuthGuard } from '@nestjs/passport';

@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({ status: 201, description: 'User Created Successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User Logged In Successfully.' })
  @ApiResponse({ status: 404, description: 'User Not Found.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get a User By Id' })
  @ApiResponse({ status: 200, description: 'User Returned By Id' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  me(@Param('id') id: string) {
    return this.authService.me(id);
  }

  @Public()
  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify One Time Password Here' })
  @ApiResponse({ status: 200, description: 'Otp Verified Successfully.' })
  @ApiResponse({ status: 401, description: 'Otp Could not be verified.' })
  verifyOtp(@Body() verifyOtpDto: OtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}
