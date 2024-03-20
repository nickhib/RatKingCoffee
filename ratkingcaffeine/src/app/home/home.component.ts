import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  
  constructor(private productService: ProductService) { }
  products2: Product[] = [];
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products2 => {
        this.products2 = products2;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
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
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    const dots = [this.dot1.nativeElement, this.dot2.nativeElement, this.dot3.nativeElement];

    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }
  
}
