import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api-url';
import { LoginDto, RegisterDto, TokenDtoResultDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${API_BASE_URL}/Auth`;

  constructor(private readonly http: HttpClient) {}

  login(input: LoginDto): Observable<TokenDtoResultDto> {
    return this.http.post<TokenDtoResultDto>(`${this.apiUrl}/login`, input);
  }

  register(input: RegisterDto): Observable<TokenDtoResultDto> {
    return this.http.post<TokenDtoResultDto>(`${this.apiUrl}/register`, input);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null);
  }

  refreshToken(): Observable<TokenDtoResultDto> {
    return this.http.post<TokenDtoResultDto>(`${this.apiUrl}/refresh-token`, null);
  }

  forgotPassword(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, null);
  }

  resetPassword(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, null);
  }
}

