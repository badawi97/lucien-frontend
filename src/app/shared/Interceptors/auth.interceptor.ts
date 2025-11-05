import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

const apiUrl = 'https://localhost:7086/api/Auth';

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<any> => {
    const http = inject(HttpClient);
    const modifiedReq = req.clone({ withCredentials: true });

    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            debugger
            if (error.status === 401 && !req.url.endsWith('/refresh-token')) {
                // Retry with refreshed token
                return http.post(apiUrl + '/refresh-token', null, { withCredentials: true }).pipe(
                    switchMap(() => {
                        // Retry the original request after token refresh
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
