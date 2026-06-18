import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api-url';
import { StringIReadOnlyCollectionResultDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl = `${API_BASE_URL}/Permissions`;

  constructor(private readonly http: HttpClient) {}

  getList(): Observable<StringIReadOnlyCollectionResultDto> {
    return this.http.get<StringIReadOnlyCollectionResultDto>(this.apiUrl);
  }
}

