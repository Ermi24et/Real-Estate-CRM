import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OtpDto } from './dto/otp.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedData = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return updatedData;
  }

  async saveOtp(otpDto: OtpDto) {
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 30);

    return await this.prisma.otp.create({
      data: {
        code: otpDto.code,
        userId: otpDto.userId,
        expiresAt: expireAt,
      },
    });
  }

  async getOtpByUserId(userId: string) {
    return await this.prisma.otp.findFirst({
      where: {
        userId,
      },
    });
  }

  async verifyEmail(verifyEmailDto: OtpDto) {
    const otp = await this.prisma.otp.findFirst({
      where: {
        code: verifyEmailDto.code,
        userId: verifyEmailDto.userId,
      },
    });

    if (!otp) {
      throw new NotFoundException('otp invalid');
    }
    if (otp.expiresAt < new Date()) {
      throw new BadRequestException('otp expired');
    }
    const user = await this.prisma.user.update({
      where: {
        id: verifyEmailDto.userId,
      },
      data: {
        isEmailVerified: true,
      },
    });

    if (!user) {
      throw new BadRequestException('can not update user');
    }

    return {
      success: true,
      message: 'Email verified succussfully.',
    };
  }

  async deleteOtpByUserId(userId: string) {
    return await this.prisma.otp.deleteMany({
      where: {
        userId,
      },
    });
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: 'User deleted succesfully.',
    };
  }
}
