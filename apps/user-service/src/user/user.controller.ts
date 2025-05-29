import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@fancy-shop/shared-dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get('email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Patch(':id/password')
  updatePassword(@Param('id') id: string, @Body() body: { password: string }) {
    return this.userService.updatePassword(id, body.password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
