//src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { firstName, lastName, email, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt,
      },
    });

    return { message: 'User registered, please verify OTP' };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.prisma.user.update({
      where: { email },
      data: { otp: null, otpExpiresAt: null }, // OTP verified and expired
    });

    const token = this.jwtService.sign({ userId: user.id });
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '7d' },
    ); // refresh token valid for 7 days

    await this.prisma.user.update({
      where: { email },
      data: { refreshToken },
    });
    return { accessToken: token, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { email, password } = loginDto;
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // If no user is found, throw an error
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const token = this.jwtService.sign({ userId: user.id });
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '7d' },
    );

    await this.prisma.user.update({
      where: { email },
      data: { refreshToken },
    });
    return { accessToken: token, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user || user.refreshToken !== token) {
        throw new BadRequestException('Invalid refresh token');
      }

      const newAccessToken = this.jwtService.sign({ userId: user.id });
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logout successful' };
  }
}
