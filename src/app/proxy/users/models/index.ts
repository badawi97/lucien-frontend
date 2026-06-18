import { PagedRequestDto, PagedResultDto, ResultDto } from '../../shared';
import { RoleDto } from '../../roles';

export interface UserDto {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  userName?: string | null;
  gender?: number | null;
  dateOfBirth?: string | null;
  email?: string | null;
  phone?: string | null;
  photo?: string | null;
  address?: string | null;
  passwordHash?: string | null;
  roleId?: string | null;
  role?: RoleDto | null;
}

export interface CreateUserDto {
  firstName?: string | null;
  lastName?: string | null;
  userName?: string | null;
  gender?: number | null;
  dateOfBirth?: string | null;
  email?: string | null;
  phone?: string | null;
  photo?: string | null;
  address?: string | null;
  password?: string | null;
  passwordHash?: string | null;
  roleId?: string | null;
}

export interface UpdateUserDto extends CreateUserDto {
  id?: string;
}

export interface PagedRequestUserDto extends PagedRequestDto {
  userName?: string | null;
  email?: string | null;
  gender?: number | null;
  dateOfBirth?: string | null;
  phone?: string | null;
}

export type UserDtoPagedResultDto = PagedResultDto<UserDto>;
export type UserDtoResultDto = ResultDto<UserDto>;
export type UserDtoPagedResultDtoResultDto = ResultDto<UserDtoPagedResultDto>;

