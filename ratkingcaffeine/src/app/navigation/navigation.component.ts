import { Component } from '@angular/core';
import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: false
})
export class NavigationComponent {
  faHome = faHome;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
}
