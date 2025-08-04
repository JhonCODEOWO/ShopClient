import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../products/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ItemsCartService } from '../../cart-shopping/items-cart.service';

@Component({
  selector: 'app-view-product',
  imports: [CurrencyPipe, LoaderComponent],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductComponent {
  cartService = inject(ItemsCartService);
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  slug = this.activatedRoute.snapshot.paramMap.get('slug');
  product = signal<Product | null>(null);
  
  loadProduct = effect(()=> {
    this.productService.findProduct(this.slug ?? '').subscribe(product => this.product.set(product))
  })
}
