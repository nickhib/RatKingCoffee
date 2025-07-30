import { Component, Input , OnInit,OnChanges, SimpleChanges} from '@angular/core';
import {PageEvent,MatPaginatorModule} from '@angular/material/paginator';
import { Product, Filter, ApiProduct } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-pagination',
  imports: [
    MatPaginatorModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './products-pagination.component.html',
  styleUrl: './products-pagination.component.css'
})
export class ProductsPaginationComponent implements OnInit,OnChanges {

//uses model to export product interface, then we import it here and use it like so
  @Input() allProducts: ApiProduct[] = [];
  @Input() filters: Filter[] = [];

  length = this.allProducts.length;
  pageSize = 10;
  pageIndex = 0; 
   hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  startIndex = 1;
  endIndex = 10 ;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 50,
    
  };
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.updatePaginationProducts();
  }
  displayedProducts: ApiProduct[] = [];
  updatePaginationProducts() {
    this.startIndex = (this.pageIndex*this.pageSize);
    this.endIndex = (this.pageIndex+1)*this.pageSize;
    //slice should take a range of products.
    this.displayedProducts = this.allProducts.slice(this.startIndex, this.endIndex);
  }
  filterbyCategory() {
    const selecteditems: string[] = [];
    for(let i = 0; i < this.filters.length; i++)
    {
      let selectedcategories = Object.entries(this.filters[i].selected).filter(([_,isSelected]) => isSelected).map(([option]) => option)
     // uses spread to push the items at once
      selecteditems.push(...selectedcategories);
    }

  this.displayedProducts = this.allProducts.filter(product =>
  selecteditems.includes(product.category ?? ''));
  
  if(selecteditems.length ===0)
  {
    this.length = this.allProducts.length;
    this.displayedProducts = this.allProducts.slice(this.startIndex, this.endIndex);
  }
  else {
    this.length = this.displayedProducts.length;
  }

  }
  ngOnInit(){
    console.log("pagination",this.allProducts);
  this.startIndex = (this.pageIndex*this.pageSize);
    this.endIndex = (this.pageIndex+1)*this.pageSize;
    this.displayedProducts = this.allProducts.slice(this.startIndex, this.endIndex);
    this.length = this.allProducts.length;
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['filters']) {
    this.filterbyCategory();
  }
  if (changes['allProducts']) {//check for changes since we are waiting for array to filled/ unwraping the observable
      this.updateDisplayedProducts();
  }
  console.log(this.length);
}
  updateDisplayedProducts(): void {
    this.displayedProducts = [...this.allProducts];//use spread
  }

}
