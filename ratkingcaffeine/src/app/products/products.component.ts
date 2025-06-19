import { Component , OnInit} from '@angular/core';
import { Product,Filter } from '../models/product.model';
import { ProductsPaginationComponent } from '../products-pagination/products-pagination.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDataService } from '../services/product-data.service';


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
  testProducts: Product[]=[] ;
  filters: Filter [] = [];
  filterUpdated(updatedFilters: Filter[])
  {
    this.filters =updatedFilters;
    console.log("it updated");
    //should update existing filter.
  }

  ngOnInit(): void 
  {
    this.testProducts =this.productData.getProducts();
    this.filters = this.productData.getFilter();
  };
}
