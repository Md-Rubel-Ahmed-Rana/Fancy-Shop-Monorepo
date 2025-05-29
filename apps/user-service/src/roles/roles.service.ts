import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from '@fancy-shop/shared-dtos';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    await this.prisma.role.create({
      data: createRoleDto,
    });
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Role created successfully!',
      data: null,
    };
  }

  async findAll() {
    const roles = await this.prisma.role.findMany({});
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Roles retrieved successfully!',
      data: roles,
    };
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Role retrieved successfully!',
      data: role,
    };
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.prisma.role.update({
      where: { id },
      data: { ...updateRoleDto },
    });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Role updated successfully!',
      data: role,
    };
  }

  async remove(id: string) {
    await this.prisma.role.delete({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Role deleted successfully!',
      data: null,
    };
  }
}
