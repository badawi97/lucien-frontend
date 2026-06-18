import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { API_BASE_URL } from '../../proxy/api-url';

const authApiUrl = `${API_BASE_URL}/Auth`;

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const http = inject(HttpClient);
    const modifiedReq = req.clone({ withCredentials: true });

    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !req.url.endsWith('/refresh-token')) {
                return http.post(`${authApiUrl}/refresh-token`, null, { withCredentials: true }).pipe(
                    switchMap(() => {
                        return next(modifiedReq);
                    }),
                    catchError(err => {
                        console.error('Token refresh failed', err);
                        return throwError(() => err);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};
