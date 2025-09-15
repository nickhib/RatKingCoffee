import { Component , OnInit} from '@angular/core';
import { Product,Filter, ApiProduct } from '../models/product.model';
import { ProductsPaginationComponent } from '../products-pagination/products-pagination.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDataService } from '../services/product-data.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    imports: [
      ProductsPaginationComponent,
      ProductFilterComponent,
    ],
    styleUrls: ['./products.component.css'],
    standalone: true
})
export class ProductsComponent implements OnInit {
  constructor(private productData: ProductDataService) {}
  currentYear = new Date().getFullYear();
  pageIndex: number =1;
  testProducts: Product[] = [];
  allProducts: ApiProduct[] = [];
  filters: Filter [] = [];
  filterUpdated(updatedFilters: Filter[])
  {
    this.filters =updatedFilters;
    console.log("it updated");
    
    //should update existing filter.
    console.log(this.allProducts);
  }

  ngOnInit(): void 
  {

    this.filters = this.productData.getFilter();
    this.productData.getProducts().subscribe({
      next: testProducts2 => {
        this.allProducts = testProducts2;
        console.log('Products2:', this.allProducts);;
      },
      error: err => {
        console.error("error fetching",err);
        
      }
  });
  };
}
