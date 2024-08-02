import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto';
import { OtpDto } from 'src/users/dto/otp.dto';
import { Public } from './decorator/public.decorator';

@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User Logged In Successfully.' })
  @ApiResponse({ status: 404, description: 'User Not Found.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify One Time Password Here' })
  @ApiResponse({ status: 200, description: 'Otp Verified Successfully.' })
  @ApiResponse({ status: 401, description: 'Otp Could not be verified.' })
  verifyOtp(@Body() verifyOtpDto: OtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}
