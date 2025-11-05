import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { AuthRoutesEnum } from './enums/auth-routes.enum';

export const AUTH_ROUTES: Routes = [

    {
        component: AuthLayoutComponent,
        path: '',
        children: [
            {
                path: '',
                redirectTo: AuthRoutesEnum.login,
                pathMatch: 'full'
            },
            {
                path: AuthRoutesEnum.login,
                component: LoginComponent
            },
            {
                path: AuthRoutesEnum.register,
                component: RegisterComponent
            },
            {
                path: AuthRoutesEnum.forgotPassword,
                component: ForgotPasswordComponent
            }
        ]
    }
];
