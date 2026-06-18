import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api-url';
import { AssignPermissionToRoleDto, PermissionDto, PermissionDtoResultDto } from '../../permissions';
import { ResultDto, buildHttpParams } from '../../shared';
import {
  CreateRoleDto,
  PagedRequestRoleDto,
  RoleDtoPagedResultDtoResultDto,
  RoleDtoResultDto,
  UpdateRoleDto,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly apiUrl = `${API_BASE_URL}/Roles`;

  constructor(private readonly http: HttpClient) {}

  getList(input?: PagedRequestRoleDto): Observable<RoleDtoPagedResultDtoResultDto> {
    return this.http.get<RoleDtoPagedResultDtoResultDto>(this.apiUrl, {
      params: buildHttpParams(input),
    });
  }

  getById(id: string): Observable<RoleDtoResultDto> {
    return this.http.get<RoleDtoResultDto>(`${this.apiUrl}/${id}`);
  }

  create(input: CreateRoleDto): Observable<RoleDtoResultDto> {
    return this.http.post<RoleDtoResultDto>(this.apiUrl, input);
  }

  update(id: string, input: UpdateRoleDto): Observable<RoleDtoResultDto> {
    return this.http.put<RoleDtoResultDto>(`${this.apiUrl}/${id}`, input);
  }

  delete(id: string): Observable<ResultDto<string | null>> {
    return this.http.delete<ResultDto<string | null>>(`${this.apiUrl}/${id}`);
  }

  getPermissions(roleId: string): Observable<ResultDto<PermissionDto[]>> {
    return this.http.get<ResultDto<PermissionDto[]>>(`${this.apiUrl}/${roleId}/permissions`);
  }

  assignPermission(roleId: string, input: AssignPermissionToRoleDto): Observable<PermissionDtoResultDto> {
    return this.http.post<PermissionDtoResultDto>(`${this.apiUrl}/${roleId}/permissions`, input);
  }

  removePermission(roleId: string, permissionName: string): Observable<ResultDto<string | null>> {
    return this.http.delete<ResultDto<string | null>>(
      `${this.apiUrl}/${roleId}/permissions/${encodeURIComponent(permissionName)}`
    );
  }
}

