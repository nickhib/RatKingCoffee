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
  average: number = 0;
  totalReviews: number = 0;
  averagePercentage: number = 0;
  fiveStarPercent: number = 0;
  fourStarPercent: number = 0;
  threeStarPercent: number = 0;
  twoStarPercent: number = 0;
  oneStarPercent: number = 0;



  ngOnInit(): void {
     const productId = this.route.snapshot.paramMap.get('id');
     if(productId)
     {
      this.fiveStar= this.productDataService.get_Total_Reviews_per_score(5,productId) ?? 5;
      this.fourStar= this.productDataService.get_Total_Reviews_per_score(4,productId) ?? 5;
      this.threeStar= this.productDataService.get_Total_Reviews_per_score(3,productId) ?? 5;
      this.twoStar= this.productDataService.get_Total_Reviews_per_score(2,productId) ?? 5;
      this.oneStar= this.productDataService.get_Total_Reviews_per_score(1,productId) ?? 5;
      this.totalReviews = this.productDataService.get_Total_Reviews(productId);
      const totalScore = (this.fiveStar*5) +(this.fourStar*4) +(this.threeStar*3) +(this.twoStar*2)+(this.oneStar*1);
      const maxScore = (5*this.totalReviews)
      //gather all percentages
      if(this.totalReviews > 0){
        this.fiveStarPercent = (this.fiveStar / this.totalReviews)*100;
        this.fourStarPercent = (this.fourStar / this.totalReviews)*100;
        this.threeStarPercent = (this.threeStar / this.totalReviews)*100;
        this.twoStarPercent = (this.twoStar / this.totalReviews)*100;
        this.oneStarPercent = (this.oneStar / this.totalReviews)*100;
        this.average = ((totalScore/maxScore)*5);
        this.averagePercentage = ((totalScore/maxScore)*100)
        
      }
     }

  
  };
//get_Total_Reviews_Count(score: number, id: string)


}
