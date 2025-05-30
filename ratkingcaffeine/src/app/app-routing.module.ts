import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutPageComponent } from './check-out-page/check-out-page.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './account/signup/signup.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
