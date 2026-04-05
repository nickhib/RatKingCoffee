import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDataService } from '../services/product-data.service';
import { ApiProduct } from '../models/product.model';

@Component({
  selector: 'app-highlighted-items',
  imports: [CommonModule, RouterModule],
  templateUrl: './highlighted-items.component.html',
  styleUrl: './highlighted-items.component.css'
})
export class HighlightedItemsComponent implements OnInit {
  cards: ApiProduct[] = [];

  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
    this.productDataService.getProducts().subscribe(products => {
      this.cards = products.slice(0, 5);
    });
  }
}
