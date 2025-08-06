import { Injectable } from '@angular/core';
import { Product, shoppingCart ,fullCartItems } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';
import { ProductDataService } from '../services/product-data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { F } from '@angular/cdk/a11y-module.d-DBHGyKoh';
import { json } from 'express';
@Injectable({
  providedIn: 'root'
})
/* Notes
cart will need to be added to database based on cookies, if user deletes cookies they lose session or cart. delete guest carts after 1 to 3 days automatically. 

i can also use behaviorsubject/ subject rxjs to multicast cart changes to reduce reliance on backend, however if this is not accessable  get from the backend the cart. i.e incase of local memory/ cookies wipe
*/
export class CartService {
  constructor(private productData: ProductDataService,private localStorageService: LocalStorageService) {}
  cart: shoppingCart[] =[];
  fullCart: fullCartItems[] =[];
  /*
    BehaviorSubject needs an intial value so we have []. however when one subcribes they should receive the most recent 
    emited data making it always up to date.
    
    in this way BehaviorSubject is better then Subject
    https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
  */
  private cartSubject = new BehaviorSubject<shoppingCart[]>([]);
  cartChanged$ = this.cartSubject.asObservable();
  initcart() 
  {
    const savedCart = this.localStorageService.getItem('localCart');
    const savedFilledCart = this.localStorageService.getItem('filledCart');
    if(!savedCart){
      console.warn('cart not found in local storage, attempting to sync cart with backend')
      //get cart from backend
      return;
    }
    try {
      const parsedCart = JSON.parse(savedCart);
      const parsedFilledCart = JSON.parse(savedFilledCart);
      if(!Array.isArray(parsedCart))
      {
        throw new Error('Melformed cart data');
      }
      this.fullCart = parsedFilledCart;
      this.cart = parsedCart;
    }
    catch(e)
    {
      console.warn('Error loaded parsed cart data may be melformed, attempting to sync with backend ',e);
      //sync data with backend later
    }
  }
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
    try{
      this.localStorageService.setItem('localCart',JSON.stringify(this.cart));
    }
    catch(e)
    {
      console.warn('Error local saving',e);
    }
    this.cartSubject.next([...this.cart]);
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
    this.fullCart = [];
    this.cart.forEach(productItem => {
    const productData = this.productData.getProduct(productItem.id);
    productData.subscribe(productData => {
      let cartitem;
       if (!productData) {
      cartitem = 
       {
        id: productItem.id,
        quantity: productItem.quantity,
        title: 'Unknown Product',
        price: 0,
        imageUrl: '',
        description: 'Product data not available'
      };
    }
    else{
      cartitem = 
     {
      id: productItem.id,
      quantity: productItem.quantity,
      title: productData.title,
      price: productData.price,
      imageUrl: productData.imageUrl[0],
      description: productData.description,
    };
  }
    this.fullCart.push(cartitem);
    });
   
  });
    console.log("full cart",this.fullCart);
    console.log(this.cart);
    this.localStorageService.setItem('filledCart',JSON.stringify(this.fullCart));
    return this.fullCart;
  }
}
