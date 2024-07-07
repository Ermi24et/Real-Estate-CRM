import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, roundsOfHashing);
      data.password = hashedPassword;
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        throw new ConflictException('user already exists');
      }
      const newUser = await this.prisma.user.create({
        data,
      });

      this.mailService.sendEmail(data.email, data.firstName);

      return {
        data: newUser,
        message: 'user created succesfully',
      };
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany({});
    return users;
  }

  async findOne(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('user not found');
    }
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, roundsOfHashing);
    }
    const updatedData = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return {
      updatedData,
    };
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: 'data deleted succesfully',
    };
  }
}
