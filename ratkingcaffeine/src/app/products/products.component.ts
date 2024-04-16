import { Component , OnInit} from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products2: Product[] = [];
  currentPage: number = 1; 
  totalPages: number = 0;
  pageSize: number = 12; 
  totalProductSubscription!: Subscription;
  constructor(private router: Router , private route: ActivatedRoute ,private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts(this.currentPage);

    this.totalProductSubscription = this.productService.getTotalProduct().subscribe(
      totalPages => {
        // Store the total number of pages
        this.totalPages = totalPages;
      },
      error => {
        console.error('Error fetching total pages:', error);
      }
    );
  }
  
  loadProducts(page: number): void {
    const startId = (page - 1) * this.pageSize + 1;
    const endId = startId + this.pageSize - 1;
    this.productService.getrangeProducts(startId, endId).subscribe(
      products2 => {
        this.products2 = products2;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
  onPageChange(page: number): void {
    const nextPage = this.currentPage + page;
    if (nextPage >= 1 && nextPage <= this.totalPages) {
      this.currentPage = nextPage;
      this.loadProducts(this.currentPage);
    }
  }
  
  ngOnDestroy(): void {
    this.totalProductSubscription.unsubscribe();
  }
  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
