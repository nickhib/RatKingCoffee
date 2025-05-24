import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedItemsComponent } from './highlighted-items.component';

describe('HighlightedItemsComponent', () => {
  let component: HighlightedItemsComponent;
  let fixture: ComponentFixture<HighlightedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
