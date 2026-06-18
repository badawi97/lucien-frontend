import { ResultDto } from '../../shared';

export interface PermissionDto {
  id?: string;
  roleId?: string;
  name?: string | null;
}

export interface AssignPermissionToRoleDto {
  name?: string | null;
}

export type PermissionDtoResultDto = ResultDto<PermissionDto>;
export type PermissionDtoIReadOnlyCollectionResultDto = ResultDto<PermissionDto[]>;
export type StringIReadOnlyCollectionResultDto = ResultDto<string[]>;

