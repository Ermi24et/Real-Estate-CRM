import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Public()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({ status: 201, description: 'User Created Successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtGuard)
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get a User By Id' })
  @ApiResponse({ status: 200, description: 'User Returned By Id' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  async findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @ApiOperation({ summary: 'Update a User By Id' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  @Patch(':id')
  async updateUser(@Body() id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a User By Id' })
  @ApiResponse({ status: 200, description: 'User deleted Successfully' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  @Delete(':id')
  async deleteUser(@Param() id: string) {
    return this.usersService.deleteUser(id);
  }
}
