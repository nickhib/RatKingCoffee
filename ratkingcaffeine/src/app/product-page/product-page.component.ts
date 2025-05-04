import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css',],
    standalone: false
})
export class ProductPageComponent implements OnInit {
  
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
  addToCart(Product_id: number)
  {
    const orderitem: Order = {
      session_id: 123,
      product_id: Product_id,
      quantity: this.currentvalue, // Assuming you have a default quantity or you get it from somewhere
      created_at: this.currentDate, // Replace with the actual timestamp or date when the item is added to the cart
      modified_at: this.currentDate // Replace with the actual timestamp or date when the item is modified

    }
    this.orderService.addCartItem(orderitem).subscribe(
      (response) => {
        console.log('Item added to cart successfully:', response);
        // Optionally, you can handle the success response here
      },
      (error) => {
        console.error('Error adding item to cart:', error);
        // Optionally, you can handle the error here
      }
    );

  }
}
