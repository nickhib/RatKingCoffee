import { Component , Input,OnInit} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProductDataService } from '../services/product-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page-reviews',
  imports: [
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './product-page-reviews.component.html',
  styleUrl: './product-page-reviews.component.css'
})
export class ProductPageReviewsComponent implements OnInit{
  constructor(private route: ActivatedRoute,private productDataService: ProductDataService) {}
  fiveStar: number = 0;
  fourStar: number = 0;
  threeStar: number = 0;
  twoStar: number =0;
  oneStar: number = 0;
  fiveStarPercent: number = 0;
  fourStarPercent: number = 0;
  threeStarPercent: number = 0;
  twoStarPercent: number = 0;
  oneStarPercent: number = 0;



  ngOnInit(): void {
     const productId = this.route.snapshot.paramMap.get('id');
     if(productId)
     {
      this.fiveStar= this.productDataService.get_Total_Reviews_Count(5,productId) ?? 5;
      this.fourStar= this.productDataService.get_Total_Reviews_Count(4,productId) ?? 5;
      this.threeStar= this.productDataService.get_Total_Reviews_Count(3,productId) ?? 5;
      this.twoStar= this.productDataService.get_Total_Reviews_Count(2,productId) ?? 5;
      this.oneStar= this.productDataService.get_Total_Reviews_Count(1,productId) ?? 5;
      const totalReviews = this.fiveStar +this.fourStar +this.threeStar +this.twoStar+this.oneStar;
      //gather all percentages
      if(totalReviews > 0){
        this.fiveStarPercent = (this.fiveStar / totalReviews)*100;
        this.fourStarPercent = (this.fourStar / totalReviews)*100;
        this.threeStarPercent = (this.threeStar / totalReviews)*100;
        this.twoStarPercent = (this.twoStar / totalReviews)*100;
        this.oneStarPercent = (this.oneStar / totalReviews)*100;
      }
     }

  
  };
//get_Total_Reviews_Count(score: number, id: string)


}
