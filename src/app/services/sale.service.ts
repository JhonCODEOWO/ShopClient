import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateSaleInterface } from '../interfaces/create-sale.interface';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private url = `${environment.API_URL}/sales`;
  private client = inject(HttpClient);

  createSale(data: CreateSaleInterface): Observable<any>{
    return this.client.post(`${this.url}/store`, data);
  }
}
