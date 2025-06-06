import { Component, Input,OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductPageCarouselComponent } from '../product-page-carousel/product-page-carousel.component';
import { ProductPageReviewsComponent } from '../product-page-reviews/product-page-reviews.component';
import { ProductPageReviewsPaginationComponent } from '../product-page-reviews-pagination/product-page-reviews-pagination.component';
interface products {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category?: string; 
  id?: string;
  rating?: number;
  stock?: number;  
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  discountPercentage?: number;
  sku?: string;
}
@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    imports: [
    FormsModule,
    CommonModule,
    ProductPageCarouselComponent ,
    ProductPageReviewsComponent,
    ProductPageReviewsPaginationComponent
    ],
    styleUrls: ['./product-page.component.css',],
    standalone: true
})
export class ProductPageComponent implements OnInit {
@Input() testProducts: products[] = [];
productId: string | null = null;
  

  
  openModal() {
    const modalImage = document.querySelector('#modalImage') as HTMLImageElement;
    const mainPhoto = document.querySelector('#carouselExampleCaptions .carousel-item.active img') as HTMLImageElement;
    modalImage.src = mainPhoto.src;
  }
  currentDate: string;
  
  product: Product | undefined;
  constructor(private route: ActivatedRoute) 
   {
    
    this.currentDate  = new Date().toISOString();
   }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId);
   
    }
  }

