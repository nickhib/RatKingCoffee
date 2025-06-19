import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageCarouselComponent } from './product-page-carousel.component';

describe('ProductPageCarouselComponent', () => {
  let component: ProductPageCarouselComponent;
  let fixture: ComponentFixture<ProductPageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
