import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Review } from '../models/product.model';
import { WriteReviewFormDialogComponent } from './write-review-form-dialog.component';

describe('WriteReviewFormDialogComponent', () => {
  let component: WriteReviewFormDialogComponent;
  let fixture: ComponentFixture<WriteReviewFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteReviewFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteReviewFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
