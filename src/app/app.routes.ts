import { Routes } from '@angular/router';
import { LayoutShopComponent } from './layout/shop/shop.component';
import { IndexComponent } from './pages/index/index.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';

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
            }
        ]
    }
];
