import { Routes } from '@angular/router';

import { AuthGuard } from './shared/Guards/auth.guard';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin-module/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth-module/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
