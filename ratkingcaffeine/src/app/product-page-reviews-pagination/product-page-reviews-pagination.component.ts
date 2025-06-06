import { Component , Input,OnInit,OnChanges, SimpleChanges} from '@angular/core';
import { ProductDataService } from '../services/product-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {PageEvent,MatPaginatorModule} from '@angular/material/paginator';
import { Product,Filter ,Review} from '../models/product.model';
@Component({
  selector: 'app-product-page-reviews-pagination',
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './product-page-reviews-pagination.component.html',
  styleUrl: './product-page-reviews-pagination.component.css'
})
export class ProductPageReviewsPaginationComponent implements OnInit,OnChanges{
  constructor(private route: ActivatedRoute,private productDataService: ProductDataService) {}
  reviews: Review[] =[];
  totalReviews: number = 0;
  length = 0;
  pageSize = 5;
  pageIndex = 0; 
   hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  startIndex = 1;
  endIndex = 10 ;
  productItem?: string | null = "";
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
  }
currentSort: string = 'date'; //default sort 
onSortChange(newSortValue: string) {
    this.currentSort = newSortValue;
    if(this.productItem)
      this.reviews = this.productDataService.getSortedReviews(this.productItem,this.currentSort); 
  }
  getrating(){

  }

  ngOnInit(): void {
     const productId = this.route.snapshot.paramMap.get('id');
     
     this.productItem = productId;
     if(productId)
     {
      this.totalReviews = this.productDataService.get_Total_Reviews(productId);
      this.length = this.totalReviews;
      this.reviews = this.productDataService.getSortedReviews(productId,this.currentSort); 
     }
     
  };
  ngOnChanges(changes: SimpleChanges): void {

  };
}
