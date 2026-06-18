import { PagedRequestDto, PagedResultDto, ResultDto } from '../../shared';

export interface RoleDto {
  id?: string;
  name?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export interface CreateRoleDto {
  name?: string | null;
}

export interface UpdateRoleDto {
  id?: string;
  name?: string | null;
}

export interface PagedRequestRoleDto extends PagedRequestDto {
  name?: string | null;
}

export type RoleDtoPagedResultDto = PagedResultDto<RoleDto>;
export type RoleDtoResultDto = ResultDto<RoleDto>;
export type RoleDtoPagedResultDtoResultDto = ResultDto<RoleDtoPagedResultDto>;

