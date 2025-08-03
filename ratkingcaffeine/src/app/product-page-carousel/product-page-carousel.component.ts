import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDataService } from '../services/product-data.service';
import { CartService } from '../services/cart.service';
import { ApiProduct, Product } from '../models/product.model';

@Component({
  selector: 'app-product-page-carousel',
  imports: [
    CommonModule,
  ],
  templateUrl: './product-page-carousel.component.html',
  styleUrl: './product-page-carousel.component.css'
})
export class ProductPageCarouselComponent implements OnInit, OnChanges {
  testProduct?: ApiProduct;
  currentDate: string;
  productId: string = "";
  currentIndex = 0;
  quantity = 1;
  increaseQuantity(){
    this.quantity+=1;
  }
  decreaseQuantity(){
    if(this.quantity > 1)
      this.quantity-=1;
  }
  constructor(private route: ActivatedRoute,private productData: ProductDataService,private cartData: CartService) 
   {
    this.currentDate  = new Date().toISOString();
   }
  addToCart() {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId)
      this.cartData.addToCart(productId, this.quantity)
  }
  skipToImage(indexnumber: number)
  {
    this.currentIndex = indexnumber;
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId) 
       this.productData.getProduct(productId).subscribe({
    next: (product) => {
      this.testProduct = product;
      console.log('Loaded product:', this.testProduct);
    },
    error: (err) => {
      console.error('Error loading product:', err);
    }
});
  console.log(this.testProduct?.imageUrl);

     
      console.log("CAR",productId);
    }
    ngOnChanges(changes: SimpleChanges): void {


    }
}
