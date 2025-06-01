import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    imports: [
    CommonModule,
    FormsModule,
    ],
    styleUrls: ['./product-page.component.css',],
    standalone: true
})
export class ProductPageComponent implements OnInit {
ngOnInit(): void {
  
  }
/*  
  openModal() {
    const modalImage = document.querySelector('#modalImage') as HTMLImageElement;
    const mainPhoto = document.querySelector('#carouselExampleCaptions .carousel-item.active img') as HTMLImageElement;
    modalImage.src = mainPhoto.src;
  }
  currentDate: string;
  
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.currentDate  = new Date().toISOString();
   }
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(product => {
        this.product = product;
      });
    }
  }
  currentvalue: number = 1;
  decrement()
  {
    if(this.currentvalue > 1 )
    {
      this.currentvalue--;
    }
  }
  increment()
  {
    this.currentvalue++;
  }
addToCart(Product_id?: number) {
  if (Product_id === undefined) return; // Skip if undefined

  const orderitem: Order = {
    session_id: 123,
    product_id: Product_id,
    quantity: this.currentvalue,
    created_at: this.currentDate,
    modified_at: this.currentDate,
  };

 this.orderService.addCartItem(orderitem).subscribe(
  (response) => {
    console.log('Item added to cart successfully:', response);
  },
  (error) => {
    console.error('Error adding item to cart:', error);
  }
);
}*/
}
