import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css',]
})
export class ProductPageComponent implements OnInit {
  
  openModal() {
    const modalImage = document.querySelector('#modalImage') as HTMLImageElement;
    const mainPhoto = document.querySelector('#carouselExampleCaptions .carousel-item.active img') as HTMLImageElement;
    modalImage.src = mainPhoto.src;
  }

  
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(product => {
        this.product = product;
      });
    }
  }
}
