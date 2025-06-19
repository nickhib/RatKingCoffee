import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { ProductDataService } from '../services/product-data.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [ CartItemsComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  constructor(private productData: ProductDataService, private cartData: CartService) {}



}
