import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Name is required', context: 'name' })
  name!: string;

  @IsString({ message: 'Description is required', context: 'description' })
  description!: string;

  @IsArray({ message: 'Permissions must be an array', context: 'permissions' })
  @ArrayNotEmpty({ message: 'Permissions cannot be empty' })
  @IsString({ each: true, message: 'Each permission must be a string' })
  permissions!: string[];
}
