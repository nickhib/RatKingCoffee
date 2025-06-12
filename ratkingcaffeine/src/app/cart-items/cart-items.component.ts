import { Component,OnInit } from '@angular/core';
import { Product, shoppingCart ,fullCartItems } from '../models/product.model';
import { ProductDataService } from '../services/product-data.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-items',
  imports: [CommonModule,],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit {

constructor(private productData: ProductDataService, private cartData: CartService) {}
  cart: shoppingCart[] =[];
  fullCart: fullCartItems[] =[];
  total: number = 0;

   ngOnInit(): void {
    this.cart = this.cartData.getCart();
    this.refreshEnrichedCart()
    for( const item of this.fullCart)
    {
      this.total = this.total +  (item.price * item.quantity);
    }
  };



private refreshEnrichedCart() {
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
}

}
