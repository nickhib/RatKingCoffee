export interface Product {
  title: string;
  description: string;
  imageUrl: string[];
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
export interface Filter {
  label: string;
  options: string[];
  expanded: boolean;
  selected: {
    [optionName: string]: boolean;
  };
}
export interface Review {
  rating: number;
  comment: string;
  reviewer: string;
  date: string;
}

export interface Coffee {
  id: string;
  reviews: Review[];
}