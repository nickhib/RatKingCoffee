import { Component,Input } from '@angular/core';
import { CartWithProduct } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: false
})
export class CartComponent {
  @Input() cartItemId: number = 0;
  constructor(private router: Router ,private OrderService: OrderService) { }


  cart: CartWithProduct[] = [];
  ngOnInit(): void {
    this.loadCartItems();
  }
  loadCartItems(): void {
    this.OrderService.getCartItems().subscribe(
      cart => {
        this.cart = cart;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
  deletecartitem(cartItemId: number): void {
      this.OrderService.deleteCartItem(cartItemId).subscribe(
      (response) => {
        console.log('Response:', response);
        console.log('Cart item deleted successfully');
      },
      error => {
        console.error('Error deleting cart item:', error);
      }
    );
  }
  Calculatetotal(): number {
    let totalprice = 0.0;// "let" makes the variable a local vairable for the function itself


    for(const item of this.cart)
    {
      totalprice += item.price * item.quantity;
    }
    return totalprice;
  }
}
