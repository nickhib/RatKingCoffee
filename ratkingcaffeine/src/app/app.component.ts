import { Component } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component'
import { RouterModule } from '@angular/router';



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
  title = 'ratkingcaffeine';
}
