import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../services/cart.service';
import { ProductDataService } from '../services/product-data.service';
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    imports: [
      MatIconModule,
      MatButtonModule,
      MatBadgeModule,
      FontAwesomeModule,
      RouterModule,
      NgOptimizedImage,
    ],
    styleUrls: ['./navigation.component.css'],
    standalone: true
,})
export class NavigationComponent implements OnInit {
  quantity: number = 0;
  constructor(private cartData: CartService,private productService: ProductDataService) {}
  faHome = faHome;
  faUser = faUser;

  faShoppingCart = faShoppingCart;


  //property binding variables. 
  mainLogo = "./assets/ratking.png";
  aboutPage = "/about";
  productsPage = "/products";
  homePage = "/home";
  cartPage = "/cart";
  ngOnInit(): void {
    console.log("initcart");
    this.cartData.initcart();
    this.cartData.cartChanged$.subscribe(() => {
      this.quantity = this.cartData.getCartQuantity();
    });
    this.quantity = this.cartData.getCartQuantity();
  }
  onProductsHover() {
    this.productService.preFetchProducts(); 
    console.log("prefetch");
  }

}
