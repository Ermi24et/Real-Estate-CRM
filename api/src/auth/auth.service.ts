//src/auth/auth.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { OtpDto } from 'src/users/dto/otp.dto';
import { JwtServiceAtRt } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtServiceAtRt,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);

      const accessToken = await this.jwtService.accessToken({
        userId: user.id,
        email: user.email,
      });
      const refreshToken = await this.jwtService.refreshToken({
        userId: user.id,
        email: user.email,
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.usersService.findUserByEmail(
        registerDto.email,
      );
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const user = await this.usersService.createUser({
        ...registerDto,
        password: hashedPassword,
      });

      const emailOtpRes = await this.sendOtpByEmail(registerDto.email);

      const saveOtp = await this.usersService.saveOtp({
        code: parseInt(emailOtpRes.otp),
        userId: user.id,
      });

      if (!saveOtp) {
        throw new BadRequestException('can not save the otp');
      }

      return {
        message: 'user created successfully',
        user,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async me(id: string) {
    return await this.usersService.findUserById(id);
  }

  async verifyOtp(verifyEmailDto: OtpDto) {
    try {
      const otp = await this.usersService.verifyEmail(verifyEmailDto);
      if (!otp) {
        throw new ForbiddenException('Otp verification failed');
      } else if (otp.success) {
        const user = await this.usersService.findUserById(
          verifyEmailDto.userId,
        );

        const accessToken = this.jwtService.accessToken({
          email: user.email,
          userId: user.id,
        });
        const refreshToken = this.jwtService.refreshToken({
          email: user.email,
          userId: user.id,
        });

        delete user.password;

        return {
          success: true,
          message: 'Otp verified successfully',
          user,
          accessToken,
          refreshToken,
        };
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async sendOtpByEmail(email: string) {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const message: string = `confirm your one time password ${otp}`;
    await this.mailService.sendOtpMessage({
      email,
      message,
    });
    return {
      otp,
    };
  }
}
