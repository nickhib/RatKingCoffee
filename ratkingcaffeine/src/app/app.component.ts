import { Component } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component'
import { RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
      NavigationComponent,
      RouterModule
    ],
    standalone: true
})
export class AppComponent {
  constructor(private cartData: CartService) {}
  title = 'ratkingcaffeine';
  ngOnInit(): void {
    console.log("initcart");
    this.cartData.initcart();
  }
}
