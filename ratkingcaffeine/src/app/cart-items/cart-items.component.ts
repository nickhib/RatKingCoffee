import { Component,OnInit } from '@angular/core';
import { Product, shoppingCartItems  } from '../models/product.model';
import { ProductDataService } from '../services/product-data.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cart-items',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit {

constructor(private productData: ProductDataService, private cartData: CartService) {}
  cart: shoppingCartItems[] =[];
  total: number = 0;
  quantity: number = 0;
  checkOutPage = "/checkout";

  /*
  when cart is changed we will update the cart with the subscribe all this does is when cart changes it will emit
  the value to subscribers and when that happens we will change the cart.

  signals could be better and more intuitive
  */
   ngOnInit(): void {
    this.cartData.cartChanged$.subscribe( () => {
        this.refreshEnrichedCart();
    });
  /*
    currently total is calculated in the backend however i also do it in the front end
  */
    this.total = 0;
    for( const item of this.cart)
    {
      this.total = this.total +  (item.price * item.quantity);
    }
  };
  updateSubTotal() {
    this.total = 0;
    for( const item of this.cart)
    {
      this.total = this.total +  (item.price * item.quantity);
    }
  }
  increaseQuantity(product: any){
    this.cartData.addToCart(product, 1);
    this.updateSubTotal();
    //this should change the quantity of the original array as well. 
  }
  decreaseQuantity(product: any){
    if(product.quantity > 1){
      this.cartData.addToCart(product, -1);
      this.updateSubTotal();
    }
  }
private refreshEnrichedCart() {
  this.cart = this.cartData.getFullCart();
}

}
