import { Injectable } from '@angular/core';
import { ApiProduct, shoppingCartItems } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';
import { ProductDataService } from '../services/product-data.service';
import { BehaviorSubject, Subject , Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
export class CartService 
{
  constructor(private productData: ProductDataService,private localStorageService: LocalStorageService,private http: HttpClient) {}

  productitem?: ApiProduct;

  private baseUrl = 'http://localhost:3000/api/cart';

  cart: shoppingCartItems[] =[];

  /*

    BehaviorSubject needs an intial value so we have []. however when one subcribes they should receive the most recent 

    emited data making it always up to date.

    in this way BehaviorSubject is better then Subject
    https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject

  */

  private cartSubject = new BehaviorSubject<shoppingCartItems[]>([]);
  cartChanged$ = this.cartSubject.asObservable();
  syncWithBackend(items: shoppingCartItems[]) : void 
  {
    this.http.post(`${this.baseUrl}/sync`, { items }).subscribe({
      next: () => {},
      error: (err) => console.error(err)
    });
  }
  initcart() 
  {//perhaps revisit refactor how local storage is updated. productPagecarousel / navigation
    // there are two ways we can do this keep how is or change cart to contain the full item with quantity. 
    const savedCart = this.localStorageService.getItem('localCart');
    if(!savedCart){
      console.warn('cart not found in local storage, attempting to sync cart with backend')
      //get cart from backend
      return;
    }
    try {
      const parsedCart = JSON.parse(savedCart);
      if(!Array.isArray(parsedCart) )
      {
        throw new Error('Melformed cart data');
      }
      this.cart = parsedCart;
    }
    catch(e)
    {
      console.warn('Error loaded parsed cart data may be melformed, attempting to sync with backend ',e);
    }
  }
  addToCart(product: ApiProduct, productQuantity: number){

    const item: shoppingCartItems = {  
      id: product.id,
      quantity: productQuantity,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl[0],
      description: product.description
    };
    const exists = this.cart.find(item => item.id === product.id);
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
      this.syncWithBackend(this.cart); 

      console.log("yes");
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
    return this.cart;
  }
  getCashTotal() {
    return this.cart.reduce((sum,item) => sum +(item.price*item.quantity), 0);
  }
}
