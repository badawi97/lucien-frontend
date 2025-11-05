import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AuthGuard } from '../../shared/Guards/auth.guard';
import { ModulesRoutesEnum } from '../../proxy/common/Modules/enums/modules-routes.enum';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const ADMIN_ROUTES: Routes = [
    {
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        providers: [AuthGuard],
        path: '',
        children: [
            {
                path: ModulesRoutesEnum.identityManagement,
                loadChildren: () => import('./components/identity-management/identity-management.routes').then(m => m.IDENTITY_MANAGEMENT_ROUTES)
            },
            {
                path: ModulesRoutesEnum.settingsManagement,
                loadChildren: () => import('./components/settings-management/settings-management-routes').then(m => m.SETTINGS_MANAGEMENT_ROUTES)
            },
            {
                path: ModulesRoutesEnum.dashboard,
                component: DashboardComponent
            },
        ]
    }
];
