import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
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
  currentPage = computed(() => {
    return this.products()?.current_page ?? 0;
  })

  loadProducts = effect(() => {
    this.productService.searchProducts().subscribe(data => this.products.set(data));
  })

  onLoadMore(){
    this.productService.searchProducts(1, this.currentPage() + 1)
      .subscribe(paginatedResponse => this.products.update((prev) => {
        if(!prev) return {...paginatedResponse};
        return {
          ...paginatedResponse,
          data: [...prev.data, ...paginatedResponse.data]
        }
      })
    );
  }
}
