import { IsString, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name is required', context: 'name' })
  name!: string;

  @IsString({ message: 'First name is required', context: 'first_name' })
  first_name!: string;

  @IsString({ message: 'Last name is required', context: 'last_name' })
  last_name!: string;

  @IsUUID('all', { message: 'Role id must be UUID', context: 'role_id' })
  role_id!: string;

  @IsEmail({}, { message: 'Email is required', context: 'email' })
  email!: string;

  @IsString({ message: 'Password is required', context: 'password' })
  password!: string;

  @IsOptional()
  last_login?: Date;
}
