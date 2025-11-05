import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from '../auth/models';
import { TokenDto } from '../token/models';

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'https://localhost:7086/api/Users';

    constructor(private http: HttpClient) { }

    login(credentials: LoginDto): Observable<ApiResponse<TokenDto>> {
        return this.http.post<ApiResponse<TokenDto>>(`${this.apiUrl}/`, credentials);
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
