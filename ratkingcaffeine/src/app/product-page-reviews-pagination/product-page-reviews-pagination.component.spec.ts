import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageReviewsPaginationComponent } from './product-page-reviews-pagination.component';

describe('ProductPageReviewsPaginationComponent', () => {
  let component: ProductPageReviewsPaginationComponent;
  let fixture: ComponentFixture<ProductPageReviewsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageReviewsPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageReviewsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
