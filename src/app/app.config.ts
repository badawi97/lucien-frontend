import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './shared/Interceptors/auth.interceptor';
import { provideApi } from './proxy';

/** Base URL for generated OpenAPI clients. Endpoint paths include `/api`. */
export const API_ROOT_URL = 'https://localhost:7086';
export const AUTH_API_URL = `${API_ROOT_URL}/api/Auth`;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideApi(API_ROOT_URL),
  ]
};
