import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../products/interfaces/product.interface';
import { InCart } from './interfaces/in-cart.interface';
import { ProductInSale } from '../interfaces/create-sale.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsCartService {
  /**
   * Array of InCart interface
   * @private 
   */
  private items = signal<InCart[]>([]);

  /**
   * Computed signal to get data from items
   * @public
   */
  _items = computed(() => this.items());

  /**
   * Amount of all products in cart
   * @public
   */
  _subtotal = computed(() => {
    return (this.items().length > 0)? this.items().map(element => element.product.price * element.quantity).reduce((prev, curr) => prev + curr): 0;
  })

  /**
   * Add a product to the cart
   * @public
   * @param product Product to be added
   * @param quantity Quantity of the product
   * @returns void
   */
  putItem(product: Product, quantity: number = 1) {
    this.items.update(items => {
      const index = items.findIndex(actualItems => actualItems.product.id === product.id);
      if(index === -1) return [...items, {product, quantity}];
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + quantity
      }
      return [...items]
    })
  }

  /**
   * Remove a product from the cart
   * @public
   * @param id The id of the product to delete
   */
  removeItem(id: number) {
    this.items.update((data) =>
      data.filter((product) => product.product.id != id)
    );
  }

  /**
   * Transform items in sale to ProductInSale array interface, use it to make request to backend
   */
  toProductInSale(): ProductInSale[]{
    return this.items().map((item): ProductInSale => ({product_id: item.product.id, quantity: item.quantity}));
  }

  /**
   * 
   */
  removeAll(){
    this.items.set([]);
  }
}
