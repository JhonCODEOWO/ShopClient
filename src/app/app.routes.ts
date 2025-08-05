import { Routes } from '@angular/router';
import { LayoutShopComponent } from './layout/shop/shop.component';
import { IndexComponent } from './pages/index/index.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import authRoutes from './auth/auth.routes';
import { ViewCartComponent } from './cart-shopping/pages/view-cart/view-cart.component';
import paymentsRoutes from './transactions/payments.routes';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutShopComponent,
        children: [
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'view/:slug',
                component: ViewProductComponent
            },
            {
                path: 'me/cart',
                component: ViewCartComponent
            },
            {
                path: 'search',
                component: SearchResultsComponent
            },
            {
                path: 'payments',
                loadChildren: () => paymentsRoutes,
            }
        ]
    },
    {
        path: 'auth',
        loadChildren: () => authRoutes,
    }
];
