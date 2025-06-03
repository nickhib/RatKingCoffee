import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDataService } from '../services/product-data.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-page-carousel',
  imports: [
    CommonModule,
  ],
  templateUrl: './product-page-carousel.component.html',
  styleUrl: './product-page-carousel.component.css'
})
export class ProductPageCarouselComponent implements OnInit, OnChanges {
  testProduct?: Product;
  currentDate: string;
  productId: string = "";
constructor(private route: ActivatedRoute,private productData: ProductDataService) 
   {
    this.currentDate  = new Date().toISOString();
   }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId)
    this.testProduct = this.productData.getProduct(productId);

    }
    ngOnChanges(changes: SimpleChanges): void {

    }
}
