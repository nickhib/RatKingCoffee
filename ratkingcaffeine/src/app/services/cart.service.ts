import { Injectable } from '@angular/core';
import { shoppingCart,fullCartItems } from '../models/product.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: shoppingCart[] =[];
  private cartChanged = new Subject<void>();
  cartChanged$ = this.cartChanged.asObservable();

  addToCart(productId: string, productQuantity: number){
    const item: shoppingCart= {
      id: productId,
      quantity: productQuantity,
    };
    const exists = this.cart.find(item => item.id === productId);
    if(exists)
    {
      exists.quantity+= productQuantity;
    }
    else
    {
      this.cart.push(item);
    }
    this.cartChanged.next();
  }
  getCartQuantity(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  getCart()
  {
    return this.cart;
  }
  constructor() { }
}
