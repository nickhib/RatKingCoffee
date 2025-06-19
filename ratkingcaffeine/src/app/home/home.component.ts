import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
//import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { HighlightedItemsComponent } from '../highlighted-items/highlighted-items.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [
    CommonModule,
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SlideshowComponent,
    HighlightedItemsComponent,
    ],
    styleUrls: ['./home.component.css'],
    standalone: true
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router){};
  currentYear = new Date().getFullYear();// get current year
  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
  ngAfterViewInit() {
  }



}
