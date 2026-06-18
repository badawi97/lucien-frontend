import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api-url';
import { ResultDto, buildHttpParams } from '../../shared';
import {
  CreateUserDto,
  PagedRequestUserDto,
  UpdateUserDto,
  UserDtoPagedResultDtoResultDto,
  UserDtoResultDto,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = `${API_BASE_URL}/Users`;

  constructor(private readonly http: HttpClient) {}

  getList(input?: PagedRequestUserDto): Observable<UserDtoPagedResultDtoResultDto> {
    return this.http.get<UserDtoPagedResultDtoResultDto>(this.apiUrl, {
      params: buildHttpParams(input),
    });
  }

  getById(id: string): Observable<UserDtoResultDto> {
    return this.http.get<UserDtoResultDto>(`${this.apiUrl}/${id}`);
  }

  getByEmail(email: string): Observable<UserDtoResultDto> {
    return this.http.get<UserDtoResultDto>(`${this.apiUrl}/by-email`, {
      params: buildHttpParams({ email }),
    });
  }

  create(input: CreateUserDto): Observable<UserDtoResultDto> {
    return this.http.post<UserDtoResultDto>(this.apiUrl, input);
  }

  update(id: string, input: UpdateUserDto): Observable<UserDtoResultDto> {
    return this.http.put<UserDtoResultDto>(`${this.apiUrl}/${id}`, input);
  }

  delete(id: string): Observable<ResultDto<string | null>> {
    return this.http.delete<ResultDto<string | null>>(`${this.apiUrl}/${id}`);
  }
}

