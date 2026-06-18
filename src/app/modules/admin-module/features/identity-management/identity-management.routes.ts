import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { IdentityManagementRoutesEnum } from '../../../../shared/routing/enums/identity-management-routes.enum';
import { ModulesRoutesEnum } from '../../../../shared/routing/enums/modules-routes.enum';

export const IDENTITY_MANAGEMENT_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: IdentityManagementRoutesEnum.users,
                component: UsersComponent
            },
            {
                path: IdentityManagementRoutesEnum.roles,
                component: RolesComponent
            },
        ]
    }
];
