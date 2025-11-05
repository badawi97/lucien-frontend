import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { IdentityManagementRoutesEnum } from '../../../../proxy/user/enums/identity-management-routes.enum';
import { ModulesRoutesEnum } from '../../../../proxy/common/Modules/enums/modules-routes.enum';

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
