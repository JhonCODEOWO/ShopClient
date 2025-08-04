import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ItemsCartService } from '../../items-cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './view-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent {
  cartService = inject(ItemsCartService);
}
