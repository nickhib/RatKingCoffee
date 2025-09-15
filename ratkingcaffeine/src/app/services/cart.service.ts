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

//private prefetch$: Observable<ApiProduct[]> | null = null;
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
    this.http.post(`${this.baseUrl}/sync`, { items },{ withCredentials: true } ).subscribe({
      next: () => {},
      error: (err) => console.error(err)
    });
  }
    getcartWithBackend() :Observable<shoppingCartItems[]>
  {
     return this.http.get<shoppingCartItems[]>(`${this.baseUrl}/`,{ withCredentials: true });
  }
  initcart() 
  {
    const savedCart = this.localStorageService.getItem('localCart');
    if(!savedCart){
      console.warn('cart not found in local storage, attempting to sync cart with backend');
      this.getcartWithBackend().subscribe({
        next: (response: any) => {// emited item comes from next
          this.cart = response.items;
        },
        error: (err) => {
          console.log("failed to fetch cart",err);
        },
        complete:() => {
          console.log("cart fetch complete",this.cart);
          this.cartSubject.next([...this.cart]);// updates subject so it can be emited to navigation.
          this.localStorageService.setItem('localCart',JSON.stringify(this.cart));
        }
      });
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
    //get product from backend
    console.log("checking" , product , "checked");
  
  const exists = this.cart.find(item => item.id === product.id);

    if(exists)
    {
      exists.quantity+= productQuantity;
    }
    else//if it doesnt exist its pushing a item on cart then syncing with the backend
    {
      const item: shoppingCartItems = {
      id: product.id,
      quantity: productQuantity,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl[0],
      description: product.description
    };
      this.cart.push(item);
    }
    try{
      this.localStorageService.setItem('localCart',JSON.stringify(this.cart));
    }
    catch(e)
    {
      console.warn('Error local saving',e);
    }
    this.syncWithBackend(this.cart); 
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
