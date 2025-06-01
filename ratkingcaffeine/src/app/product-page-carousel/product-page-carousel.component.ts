import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  selector: 'app-product-page-carousel',
  imports: [
    CommonModule,
  ],
  templateUrl: './product-page-carousel.component.html',
  styleUrl: './product-page-carousel.component.css'
})
export class ProductPageCarouselComponent implements OnInit, OnChanges {
  @Input() testProducts: products[] = [];

  currentDate: string;
  productId: string | null = null;
constructor(private route: ActivatedRoute) 
   {
    this.currentDate  = new Date().toISOString();
   }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    }
    ngOnChanges(changes: SimpleChanges): void {
if (changes['testProducts'] && this.testProducts.length > 0) {
    console.log('Input received:', this.testProducts);
    // now safe to use this.testProducts
  }

      console.log(this.testProducts);
    const Index = this.testProducts.findIndex(p => p.id === this.productId);
    this.testProducts.splice(Index,1);
    console.log(this.testProducts);

    }
}
