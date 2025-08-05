import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { PaginatedResponse } from '../../shared/interfaces/get-all.interfacte';
import { Product } from '../../products/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from '../../products/components/product-list/product-list.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-search-results',
  imports: [ProductListComponent, PaginatorComponent],
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductService);
  query = toSignal(this.activatedRoute.queryParamMap.pipe(map(params => params.get('query'))));
  page = toSignal(this.activatedRoute.queryParamMap.pipe(map(params => {
    const page = params.get('page');
    if(page) return +page;
    return 0;
  })));
  products = signal<PaginatedResponse<Product> | null>(null);

  searchProducts = effect(() => {
    this.productsService.searchProducts(1, this.page(), this.query() ?? '').subscribe(paginated => this.products.set(paginated));
  })

  handlePaginatorClick(page: number){
    this.productsService.searchProducts(1, page, this.query() ?? '')
      .subscribe(newPaginated => this.products.update(old => {
        if(!old) return {...newPaginated};
        return {
          ...newPaginated,
        }
      }));
  }
}
