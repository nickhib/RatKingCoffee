import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageReviewsComponent } from './product-page-reviews.component';

describe('ProductPageReviewsComponent', () => {
  let component: ProductPageReviewsComponent;
  let fixture: ComponentFixture<ProductPageReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
