import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Product,homeProduct } from '../models/product.model';
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
  //constructor(private router: Router ,private productService: ProductService) { }
  //products2: homeProduct[] = [];
  /*ngOnInit(): void {
    this.loadProducts();
  }*/
  currentYear = new Date().getFullYear();// get current year
  /*loadProducts(): void {
    this.productService.getHomeProducts().subscribe(
      products2 => {
        this.products2 = products2;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }*/
  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }






  products: any[] = [
    { name: 'Product 1', description: 'stuff', imageUrl: '' },
    { name: 'Product 2', description: 'Description 2', imageUrl: 'White-coffee-bag-mockup.jpg' },
    { name: 'Product 1', description: 'Description 1', imageUrl: 'assets/4-1000x400-sarahjulianne.com.jpg' },
    { name: 'Product 2', description: 'Description 2', imageUrl: 'assets/4-1000x400-sarahjulianne.com.jpg' },
    // Add more products as needed
  ];
  addToCart(product: any) {
    // Handle adding the product to the cart
    console.log('Product added to cart:', product);

  }
  isDragging = false;
  startX!: number;
  startScrollLeft!: number;
  slideIndex = 1;

  @ViewChild('dot1') dot1!: ElementRef;
  @ViewChild('dot2') dot2!: ElementRef;
  @ViewChild('dot3') dot3!: ElementRef;




  startDrag(e: MouseEvent) {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startScrollLeft = (document.querySelector('.custom-grid-list') as HTMLElement).scrollLeft;
    (document.querySelector('.carousel-container') as HTMLElement).classList.add('dragging');
    console.log('Dragging started. Initial X:', this.startX, 'Initial Scroll Left:', this.startScrollLeft);
  }

  endDrag() {
    this.isDragging = false;
    (document.querySelector('.carousel-container') as HTMLElement).classList.remove('dragging');
    console.log('Dragging ended.');
  }

  drag(e: MouseEvent) {
    if (!this.isDragging) return;
    const x = e.clientX - this.startX;
    const scrollLeft = this.startScrollLeft - x;
    (document.querySelector('.custom-grid-list') as HTMLElement).scrollLeft = scrollLeft;
    console.log('Dragging. Current X:', e.clientX, 'Delta X:', x, 'New Scroll Left:', scrollLeft);
  }
  
  
  


  ngAfterViewInit() {
  }





}
