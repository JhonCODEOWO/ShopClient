import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ItemsCartService } from '../../cart-shopping/items-cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'layout-shop',
  imports: [RouterOutlet,RouterLink, CurrencyPipe],
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutShopComponent {
  authService = inject(AuthService);
  cartService = inject(ItemsCartService);
  cartItems = this.cartService._items;
  user = this.authService._user();

  logout(){
    this.authService.logout().subscribe(result => console.log(result));
  }
}
