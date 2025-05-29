import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string', context: 'name' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string', context: 'description' })
  description?: string;

  @IsOptional()
  @IsArray({ message: 'Permissions must be an array', context: 'permissions' })
  @ArrayNotEmpty({ message: 'Permissions cannot be empty' })
  @IsString({ each: true, message: 'Each permission must be a string' })
  permissions?: string[];
}
