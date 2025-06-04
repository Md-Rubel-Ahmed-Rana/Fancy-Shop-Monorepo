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
<<<<<<< HEAD
import { GrpcMethod } from '@nestjs/microservices';
=======
>>>>>>> ce28c9f (User CRUD operation completed)

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

<<<<<<< HEAD
  @GrpcMethod('UserService', 'GetUserByEmail')
  getUserByEmail(data: { email: string }) {
    return this.userService.getUserByEmail(data.email);
  }

  @GrpcMethod('UserService', 'GetUserById')
  getRPCUserById(data: { id: string }) {
    console.log('Got user id to fetch for GRPC id:', data.id);
    return this.userService.getRPCUserById(data.id);
  }

  @Get(':id')
=======
  @Get('id/:id')
>>>>>>> ce28c9f (User CRUD operation completed)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

<<<<<<< HEAD
=======
  @Get('email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

>>>>>>> ce28c9f (User CRUD operation completed)
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
