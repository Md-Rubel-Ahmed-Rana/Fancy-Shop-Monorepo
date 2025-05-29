export class GetPermissionDto {
  id!: string;
  name!: string;
  description!: string;
}

export class GetRoleDto {
  id!: string;
  name!: string;
  description!: string;

  permissions?: GetPermissionDto[];
}

export class GetUserDto {
  id!: string;
  name!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  role!: GetRoleDto;
  last_login?: Date;
  created_at!: Date;
  updated_at!: Date;
}
