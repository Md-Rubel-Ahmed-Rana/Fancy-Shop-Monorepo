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
<<<<<<< HEAD

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
=======
  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
>>>>>>> ce28c9f (User CRUD operation completed)
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

<<<<<<< HEAD
  async createUser(createUserDto: CreateUserDto) {
=======
  async createUser(createUserDto: CreateUserDto): Promise<void> {
>>>>>>> ce28c9f (User CRUD operation completed)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = hashedPassword;
    await this.prisma.user.create({
      data: createUserDto,
    });
<<<<<<< HEAD

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully!',
      data: null,
    };
=======
>>>>>>> ce28c9f (User CRUD operation completed)
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
<<<<<<< HEAD
        role: true,
=======
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
>>>>>>> ce28c9f (User CRUD operation completed)
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

<<<<<<< HEAD
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
=======
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: user,
    };
>>>>>>> ce28c9f (User CRUD operation completed)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
<<<<<<< HEAD

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: null,
    };
=======
>>>>>>> ce28c9f (User CRUD operation completed)
  }

  async updatePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
<<<<<<< HEAD

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User password updated successfully!',
      data: null,
    };
=======
>>>>>>> ce28c9f (User CRUD operation completed)
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
<<<<<<< HEAD
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: null,
    };
=======
>>>>>>> ce28c9f (User CRUD operation completed)
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
<<<<<<< HEAD
        permissions: user.role.permissions,
=======
        permissions: user.role.permissions.map((rp: any) => ({
          id: rp.permission.id,
          name: rp.permission.name,
          description: rp.permission.description,
        })),
>>>>>>> ce28c9f (User CRUD operation completed)
      },
    };
  }
}
