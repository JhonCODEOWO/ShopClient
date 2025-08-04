import { Routes } from '@angular/router';
import { CheckComponent } from './pages/check-page/check.component';
import { haveItemsGuard } from './guards/HaveItems.guard';

export const paymentsRoutes: Routes = [
    {
        path: 'check',
        component: CheckComponent,
        // canActivate: [haveItemsGuard],
    },
    {
        path: '**',
        redirectTo: '/'
    }
]

export default paymentsRoutes;