import { inject } from '@angular/core';
import {
    HttpBackend,
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, map, shareReplay, switchMap, throwError } from 'rxjs';
import { TokenDtoResultDto } from '../../proxy/model/models';
import { AUTH_API_URL } from '../../app.config';

const authApiUrl = AUTH_API_URL;
let refreshTokenRequest$: Observable<TokenDtoResultDto> | null = null;

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const httpBackend = inject(HttpBackend);
    const router = inject(Router);
    const modifiedReq = req.clone({ withCredentials: true });

    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (shouldRefreshToken(req, error)) {
                return refreshToken(httpBackend, router).pipe(
                    switchMap(() => {
                        return next(modifiedReq);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};

function refreshToken(httpBackend: HttpBackend, router: Router): Observable<TokenDtoResultDto> {
    if (!refreshTokenRequest$) {
        const http = new HttpClient(httpBackend);

        refreshTokenRequest$ = http.post<TokenDtoResultDto>(`${authApiUrl}/refresh-token`, null, { withCredentials: true }).pipe(
            map((response) => {
                if (response.isSuccess === false) {
                    throw new Error(response.message ?? 'Token refresh failed.');
                }

                return response;
            }),
            catchError((error: unknown) => {
                console.error('Token refresh failed', error);
                void router.navigate(['/auth/login']);
                return throwError(() => error);
            }),
            finalize(() => {
                refreshTokenRequest$ = null;
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    return refreshTokenRequest$;
}

function shouldRefreshToken(req: HttpRequest<unknown>, error: HttpErrorResponse): boolean {
    if (error.status !== 401) {
        return false;
    }

    const isAuthEndpoint = req.url.startsWith(authApiUrl);

    return !isAuthEndpoint;
}
