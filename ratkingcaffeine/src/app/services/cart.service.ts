import { Injectable } from '@angular/core';
import { Product, shoppingCart ,fullCartItems } from '../models/product.model';
import { ProductDataService } from '../services/product-data.service';
import { Subject } from 'rxjs';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { F } from '@angular/cdk/a11y-module.d-DBHGyKoh';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private productData: ProductDataService) {}
  cart: shoppingCart[] =[];
  fullCart: fullCartItems[] =[];
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

  getFullCart() {
    return this.fullCart;
  }
  getCashTotal() {
    return this.fullCart.reduce((sum,item) => sum +(item.price*item.quantity), 0);
  }
  fillcart(){
    this.fullCart = this.cart.map(productItem => {
    const productData = this.productData.getProduct(productItem.id);
    if (!productData) {
      return {
        id: productItem.id,
        quantity: productItem.quantity,
        title: 'Unknown Product',
        price: 0,
        imageUrl: '',
        description: 'Product data not available'
      };
    }
    return {
      id: productItem.id,
      quantity: productItem.quantity,
      title: productData.title,
      price: productData.price,
      imageUrl: productData.imageUrl[0],
      description: productData.description,
    };
  });

    return this.fullCart;
    
  }
}
