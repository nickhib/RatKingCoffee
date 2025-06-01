
import {  Routes } from '@angular/router';

//import { CartComponent } from './cart/cart.component';
//import { CheckOutPageComponent } from './check-out-page/check-out-page.component';

export const routes: Routes = [
  { path: 'home', loadComponent:() => import('./home/home.component').then(mod=>mod.HomeComponent) },
    {
    path: 'account',
    loadComponent: () => import('./account/account.component').then(mod => mod.AccountComponent),
    children: [
      {
        path: 'signup',
        loadComponent: () => import('./account/signup/signup.component').then(mod => mod.SignupComponent)
      }
    ]
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(mod => mod.AboutComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product-page/product-page.component').then(mod => mod.ProductPageComponent)
  },
  /*
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(mod => mod.CartComponent)
  },
  {
    path: 'cart/checkout',
    loadComponent: () => import('./check-out-page/check-out-page.component').then(mod => mod.CheckOutPageComponent)
  },*/
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(mod => mod.ProductsComponent)
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  
];
/*

{ path: 'account', 
    component: AccountComponent,
    children: [
      { path: 'signup', component: SignupComponent},
    ] },
  { path: 'about', component: AboutComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/checkout', component: CheckOutPageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:page', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
*/

