import { Component , OnInit} from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsPaginationComponent } from '../products-pagination/products-pagination.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
interface Filter {
  label: string;
  options: string[];
  expanded: boolean;
  selected: {
    [optionName: string]: boolean;
  };
}
interface products {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category?: string; 
  id?: string;
  rating?: number;
  stock?: number;  
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  discountPercentage?: number;
  sku?: string;
}
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    imports: [
      ProductsPaginationComponent,
      ProductFilterComponent,
    ],
    styleUrls: ['./products.component.css'],
    standalone: true
})
export class ProductsComponent implements OnInit {
  currentYear = new Date().getFullYear();
  pageIndex: number =1;
 testProducts: products[] = [
  {
    title: "Espresso Roast",
    description: "Rich, caramelly espresso blend with a bold flavor profile.",
    imageUrl: "assets/image3.jpg",
    price: 12.99,
    category: "Whole Bean",
    id: "coffee001",
    rating: 4.7,
    stock: 120,
    isAvailable: true,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-10"),
    discountPercentage: 10,
    sku: "WB-ESP-001"
  },
  {
    title: "French Roast",
    description: "Dark roasted with smoky, bold undertones.",
    imageUrl: "assets/image3.jpg",
    price: 13.49,
    category: "Ground",
    id: "coffee002",
    rating: 4.5,
    stock: 85,
    isAvailable: true,
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2025-01-03"),
    discountPercentage: 0,
    sku: "GR-FRCH-002"
  },
  {
    title: "Colombian Medium Roast",
    description: "Smooth and balanced with hints of caramel and cocoa.",
    imageUrl: "assets/image3.jpg",
    price: 11.99,
    category: "Whole Bean",
    id: "coffee003",
    rating: 4.6,
    stock: 200,
    isAvailable: true,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-15"),
    discountPercentage: 5,
    sku: "WB-COL-003"
  },
  {
    title: "Cold Brew Blend",
    description: "Specially crafted blend for smooth cold brews.",
    imageUrl: "assets/image3.jpg",
    price: 14.99,
    category: "Ground",
    id: "coffee004",
    rating: 4.8,
    stock: 60,
    isAvailable: true,
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2025-01-01"),
    discountPercentage: 15,
    sku: "GR-CB-004"
  },
  {
    title: "Vanilla Flavored Coffee",
    description: "Medium roast with natural vanilla flavoring.",
    imageUrl: "assets/image3.jpg",
    price: 13.99,
    category: "Flavored",
    id: "coffee005",
    rating: 4.4,
    stock: 110,
    isAvailable: true,
    createdAt: new Date("2024-10-05"),
    updatedAt: new Date("2024-12-10"),
    discountPercentage: 0,
    sku: "FL-VAN-005"
  },
  {
    title: "Hazelnut Blend",
    description: "Nutty and sweet with a warm hazelnut finish.",
    imageUrl: "assets/image3.jpg",
    price: 12.49,
    category: "Flavored",
    id: "coffee006",
    rating: 4.3,
    stock: 95,
    isAvailable: true,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-18"),
    discountPercentage: 5,
    sku: "FL-HAZ-006"
  },
  {
    title: "Italian Roast",
    description: "Intensely dark roasted for a full-bodied, bold cup.",
    imageUrl: "assets/image3.jpg",
    price: 13.25,
    category: "Whole Bean",
    id: "coffee007",
    rating: 4.6,
    stock: 130,
    isAvailable: true,
    createdAt: new Date("2024-09-25"),
    updatedAt: new Date("2024-11-30"),
    discountPercentage: 8,
    sku: "WB-ITL-007"
  },
  {
    title: "Breakfast Blend",
    description: "Mild and smooth, perfect for your morning routine.",
    imageUrl: "assets/image3.jpg",
    price: 11.49,
    category: "Ground",
    id: "coffee008",
    rating: 4.2,
    stock: 180,
    isAvailable: true,
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-22"),
    discountPercentage: 0,
    sku: "GR-BFST-008"
  },
  {
    title: "Decaf House Blend",
    description: "Same great flavor without the caffeine.",
    imageUrl: "assets/image3.jpg",
    price: 12.75,
    category: "Decaf",
    id: "coffee009",
    rating: 4.1,
    stock: 150,
    isAvailable: true,
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-12-01"),
    discountPercentage: 5,
    sku: "DF-HSE-009"
  },
  {
    title: "Pumpkin Spice",
    description: "Limited edition seasonal favorite with warm spices.",
    imageUrl: "assets/image3.jpg",
    price: 14.50,
    category: "Flavored",
    id: "coffee010",
    rating: 4.7,
    stock: 45,
    isAvailable: true,
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-10-15"),
    discountPercentage: 20,
    sku: "FL-PS-010"
  },
  {
    title: "Guatemalan Single Origin",
    description: "Bright acidity with hints of chocolate and spice.",
    imageUrl: "assets/image3.jpg",
    price: 15.99,
    category: "Single Origin",
    id: "coffee011",
    rating: 4.8,
    stock: 100,
    isAvailable: true,
    createdAt: new Date("2024-12-18"),
    updatedAt: new Date("2025-01-02"),
    discountPercentage: 10,
    sku: "SO-GUA-011"
  },
  {
    title: "Ethiopian Light Roast",
    description: "Floral notes with bright citrus and tea-like body.",
    imageUrl: "assets/image3.jpg",
    price: 16.49,
    category: "Single Origin",
    id: "coffee012",
    rating: 4.9,
    stock: 75,
    isAvailable: true,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-25"),
    discountPercentage: 0,
    sku: "SO-ETH-012"
  },
  {
    title: "Mocha Java Blend",
    description: "Classic blend with rich body and earthy undertones.",
    imageUrl: "assets/image3.jpg",
    price: 13.99,
    category: "Blends",
    id: "coffee013",
    rating: 4.5,
    stock: 90,
    isAvailable: true,
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-12-15"),
    discountPercentage: 7,
    sku: "BL-MJ-013"
  },
  {
    title: "Caramel Drizzle",
    description: "Sweet caramel flavor in a smooth, medium roast base.",
    imageUrl: "assets/image3.jpg",
    price: 12.99,
    category: "Flavored",
    id: "coffee014",
    rating: 4.3,
    stock: 110,
    isAvailable: true,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-20"),
    discountPercentage: 5,
    sku: "FL-CAR-014"
  },
  {
    title: "Sumatra Dark Roast",
    description: "Earthy and herbal with a rich, lingering finish.",
    imageUrl: "assets/image3.jpg",
    price: 14.25,
    category: "Single Origin",
    id: "coffee015",
    rating: 4.7,
    stock: 95,
    isAvailable: true,
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-25"),
    discountPercentage: 10,
    sku: "SO-SUM-015"
  },
  {
    title: "Toffee Nut Crunch",
    description: "Toffee nut flavor with sweet, roasted notes.",
    imageUrl: "assets/image3.jpg",
    price: 13.75,
    category: "Flavored",
    id: "coffee016",
    rating: 4.4,
    stock: 100,
    isAvailable: true,
    createdAt: new Date("2024-11-12"),
    updatedAt: new Date("2024-12-28"),
    discountPercentage: 8,
    sku: "FL-TNF-016"
  },
  {
    title: "Dark Chocolate Mocha",
    description: "Decadent blend with dark chocolate notes.",
    imageUrl: "assets/image3.jpg",
    price: 14.75,
    category: "Whole Bean",
    id: "coffee017",
    rating: 4.6,
    stock: 85,
    isAvailable: true,
    createdAt: new Date("2024-12-09"),
    updatedAt: new Date("2025-01-04"),
    discountPercentage: 5,
    sku: "FL-MCH-017"
  },
  {
    title: "Organic Peruvian Roast",
    description: "Smooth and clean with nutty, cocoa tones. Certified organic.",
    imageUrl: "assets/image3.jpg",
    price: 15.49,
    category: "Dark Roast",
    id: "coffee018",
    rating: 4.8,
    stock: 70,
    isAvailable: true,
    createdAt: new Date("2024-12-28"),
    updatedAt: new Date("2025-01-15"),
    discountPercentage: 12,
    sku: "ORG-PER-018"
  },
  {
    title: "Instant Coffee Pack",
    description: "Convenient single-serve instant coffee sticks.",
    imageUrl: "assets/image3.jpg",
    price: 10.99,
    category: "Ready to Drink",
    id: "coffee019",
    rating: 4.0,
    stock: 140,
    isAvailable: true,
    createdAt: new Date("2024-10-10"),
    updatedAt: new Date("2024-12-20"),
    discountPercentage: 0,
    sku: "INS-COF-019"
  },
  {
    title: "Holiday Spice Blend",
    description: "Warm blend of cinnamon, nutmeg, and clove flavors.",
    imageUrl: "assets/image3.jpg",
    price: 13.25,
    category: "Dark Roast",
    id: "coffee020",
    rating: 4.6,
    stock: 50,
    isAvailable: true,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2025-01-01"),
    discountPercentage: 15,
    sku: "SEA-HSP-020"
  }
];
filters: Filter [] = [
    {
      label: 'Product Type',
      options: ['Coffee Bag', 'Coffee Rounds', 'Ready to Drink','Bundle','Bags','Other'],
      expanded: false,
      selected: {} 
    },
    {
      label: 'Roast Style',
      options: ['Dark Roast', 'Medium Roast', 'Light Roast'],
      expanded: false,
      selected: {} 
    },
    {
      label: 'Texture',
      options: ['Ground', 'Whole Bean', 'Rounds','On-the-go','Ready to Drink'],
      expanded: false,
      selected: {} 
    },

  ];
filterUpdated(updatedFilters: Filter[])
{
  this.filters =updatedFilters;
  console.log("it updated");
  //should update existing filter.
}

    ngOnInit(): void 
    {

    };
}
