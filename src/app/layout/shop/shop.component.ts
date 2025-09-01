import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ItemsCartService } from '../../cart-shopping/items-cart.service';
import { CurrencyPipe } from '@angular/common';
import { ThemePickerComponent } from "../../components/theme-picker/theme-picker.component";
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'layout-shop',
  imports: [RouterOutlet, RouterLink, CurrencyPipe, ThemePickerComponent],
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutShopComponent{
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  cartService = inject(ItemsCartService);
  settingService = inject(SettingsService);
  
  cartItems = this.cartService._items;
  user = this.authService._user();

  logout(){
    this.authService.logout().subscribe(result => console.log(result));
  }

  search(query: string){
    this.router.navigate(['search'], {queryParams: {query}});
  }
}
