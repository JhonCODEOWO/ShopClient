import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ItemsCartService } from '../../../cart-shopping/items-cart.service';

@Component({
  selector: 'product-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  product = input.required<Product>();
  cartService = inject(ItemsCartService);
}
