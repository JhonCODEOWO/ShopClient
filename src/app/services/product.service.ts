import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { PaginatedResponse } from '../shared/interfaces/get-all.interfacte';
import { Product } from '../products/interfaces/product.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  route = `${environment.API_URL}/api/products`;
  httpClient = inject(HttpClient);

  searchProducts(): Observable<PaginatedResponse<Product>>{
    return this.httpClient.get<PaginatedResponse<Product>>(`${this.route}/list`);
  }

  findProduct(slug: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.route}/show/${slug}`).pipe(delay(2000));
  }
}
