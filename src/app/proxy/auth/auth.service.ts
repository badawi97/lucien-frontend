import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from './models';
import { TokenDto } from '../token/models';
import { Response } from '../common/api/models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'https://localhost:7086/api/Auth';

    constructor(private http: HttpClient) { }

    login(credentials: LoginDto): Observable<Response<TokenDto>> {
        return this.http.post<Response<TokenDto>>(`${this.apiUrl}/login`, credentials);
    }

    logout() {
        localStorage.removeItem('token');
        // Add other logout logic if needed
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
