import { Component , Input,OnInit} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProductDataService } from '../services/product-data.service';
import { Review } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WriteReviewFormDialogComponent } from '../write-review-form-dialog/write-review-form-dialog.component';
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
  constructor(private route: ActivatedRoute,private productDataService: ProductDataService,private dialog: MatDialog) {}
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

  getreviews(){
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

  }

  ngOnInit(): void {
     this.getreviews();
  };
//get_Total_Reviews_Count(score: number, id: string)


openReviewForm(): void {
    const dialogRef = this.dialog.open(WriteReviewFormDialogComponent, {
      data: {}, // optionally pass data here
      panelClass: 'dialog-wrapper'
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        const currentDate = new Date();
        const newReview: Review = {
          rating: result.rating,
          comment: result.comment,
          reviewer: result.reviewer,
          date: currentDate.toISOString().split('T')[0]
        }
        const productId = this.route.snapshot.paramMap.get('id');
        if(productId)
        this.productDataService.addReview(productId ,newReview);
        this.getreviews();
        // toISOString().split('T')[0] should convert into two parts
        // time comes in something like this "2025-06-06T22:04:00.000Z" we split at T
      }
    });
  }

}
