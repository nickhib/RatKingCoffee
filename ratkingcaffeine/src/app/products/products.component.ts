import { Component , OnInit} from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  products2: Product[] = [];
  currentPage: number = 1; 
  totalPages: number = 0;
  pageSize: number = 12; 
  constructor(private router: Router , private route: ActivatedRoute ,private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPage = +params['page']; // '+' is used to convert string to number
      this.loadProducts(this.currentPage);
    });

this.productService.getTotalProduct().subscribe(
  totalPages => {
    this.totalPages = totalPages;
  },
  error => {
    console.error('Error fetching total pages:', error);
  }
);
  }
  
  loadProducts(page: number): void {
    this.productService.getrangeProducts(page).subscribe(
      products2 => {
        this.products2 = products2;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
    console.log(this.products2);
  }
  
  goToProductDetail(productId: number): void {
    console.log(productId);
    this.router.navigate(['/product/', productId]);
  }
  onPageChange(page: number): void {
    const nextPage = this.currentPage + page;
    if (nextPage >= 1 && nextPage <= this.totalPages) {
      this.currentPage = nextPage;
      this.loadProducts(this.currentPage);
    }
  }
  

  getPages(): number[] {
    return Array.from({ length: (Math.ceil(this.totalPages/10) )}, (_, index) => index + 1);
  }
  roundedTotalPages(): number {
    return Math.ceil(this.totalPages / 10);
  }
  calculateNextPage(): number | null {
    const roundedTotalPages = this.roundedTotalPages();
    return this.currentPage === roundedTotalPages ? null : this.currentPage + 1;
  }
  
}
