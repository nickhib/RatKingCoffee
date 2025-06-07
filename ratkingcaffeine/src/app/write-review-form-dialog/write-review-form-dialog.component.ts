import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Review } from '../models/product.model';
@Component({

  selector: 'app-write-review-form-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './write-review-form-dialog.component.html',
  styleUrl: './write-review-form-dialog.component.css'
})
export class WriteReviewFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WriteReviewFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Review> = {}) {}

    submit(): void {
    this.dialogRef.close(this.data);
  }
 

}

