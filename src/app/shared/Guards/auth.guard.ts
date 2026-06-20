import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../../proxy/api/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> | boolean {
    if (this.shouldTrustCurrentNavigation()) {
      return true;
    }

    return this.AuthService.apiAuthRefreshTokenPost().pipe(
      map((response) => {
        if (response.isSuccess === false) {
          return this.router.createUrlTree(['/auth/login']);
        }

        return true;
      }),
      catchError(() => of(this.router.createUrlTree(['/auth/login'])))
    );
  }

  private shouldTrustCurrentNavigation(): boolean {
    const navigation = this.router.getCurrentNavigation();
    return navigation?.extras.state?.['skipAuthRefresh'] === true;
  }
}
