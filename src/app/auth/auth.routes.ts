import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './layout/AuthLayout/AuthLayout.component';
import { CreateAccountComponent } from './pages/CreateAccount/CreateAccount.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'createAccount',
        component: CreateAccountComponent
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
        path: '**',
        redirectTo: 'login',
    },
];

export default authRoutes;
