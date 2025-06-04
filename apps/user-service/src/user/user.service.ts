import {
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
} from '@fancy-shop/shared-dtos';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    console.log();
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
    const userDtos = users.map((user) => this.mapUserToDto(user));

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: userDtos,
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = hashedPassword;
    await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully!',
      data: null,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    const userDto = this.mapUserToDto(user);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: userDto,
    };
  }

  async getRPCUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    const userDto = this.mapUserToDto(user);
    console.log({ userDto });
    return userDto;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: null,
    };
  }

  async updatePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User password updated successfully!',
      data: null,
    };
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: null,
    };
  }

  mapUserToDto(user: any): GetUserDto {
    return {
      id: user.id,
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      last_login: user.last_login ?? undefined,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description,
        permissions: user.role.permissions,
      },
    };
  }
}
