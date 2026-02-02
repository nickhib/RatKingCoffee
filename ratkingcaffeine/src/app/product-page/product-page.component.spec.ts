import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input,OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductPageCarouselComponent } from '../product-page-carousel/product-page-carousel.component';
import { ProductPageReviewsComponent } from '../product-page-reviews/product-page-reviews.component';
import { ProductPageReviewsPaginationComponent } from '../product-page-reviews-pagination/product-page-reviews-pagination.component';
import { ProductPageComponent } from './product-page.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ProductPageComponent],
      providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  paramMap: {
                    get: (key: string) => (key === 'id' ? '123' : null),
                  },
                },
            // If you ever use route.params observable instead of snapshot:
            // params: of({ id: '123' })
            }
        }
    ]
    });
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the carousel', () => {
    const carousel = fixture.debugElement.query(By.css('app-product-page-carousel'));
    expect(carousel).not.toBeNull();
  })
  it('should render the reviews section ',() =>{
    const reviews = fixture.debugElement.query(By.css('app-product-page-reviews'));
    expect(reviews).not.toBeNull();
  })
  it('should render the review pagination',() => {
    fixture.debugElement.query(By.css('app-product-page-reviews-pagination'));
  }) 

});
