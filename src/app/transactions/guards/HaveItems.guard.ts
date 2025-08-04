import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { ItemsCartService } from '../../cart-shopping/items-cart.service';
import { Location } from '@angular/common';

export const haveItemsGuard: CanActivateFn = (route, state) => {
  const cartService = inject(ItemsCartService);
  const location = inject(Location);
  if(cartService._items().length === 0) location.back();
  return true;
};
