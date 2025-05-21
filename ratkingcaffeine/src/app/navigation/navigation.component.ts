import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    imports: [
      FontAwesomeModule,
      RouterModule,
      NgOptimizedImage,
    ],
    styleUrls: ['./navigation.component.css'],
    standalone: true
,})
export class NavigationComponent {
  faHome = faHome;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  //property binding variables. 
  mainLogo = "./assets/ratking.png";
  aboutPage = "/about";
  productsPage = "/products/1";
  homePage = "/home";
}
