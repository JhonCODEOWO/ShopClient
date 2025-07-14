import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PaginatedResponse } from '../../shared/interfaces/get-all.interfacte';
import { Product } from '../../products/interfaces/product.interface';
import { ProductListComponent } from "../../products/components/product-list/product-list.component";

@Component({
  selector: 'app-index',
  imports: [ProductListComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
  productService = inject(ProductService);

  products = signal<PaginatedResponse<Product> | null>(null);

  loadProducts = effect(() => {
    this.productService.searchProducts().subscribe(data => this.products.set(data));
  })
}
