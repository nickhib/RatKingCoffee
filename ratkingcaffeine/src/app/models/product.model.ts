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
export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string[];
  price: number;
  category: string;
  rating: number;
  stock: number;
  isAvailable: boolean; 
  createdAt?: string;
  updatedAt?: string; 
  discountPercentage: number;
  sku: string;
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

export interface shoppingCartItems {
  id: string;
  quantity: number;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
}
export interface emailData {
  EmailCtrl?: string | null | undefined;
}

export interface addressData {
   firstNameCtrl?: string | null | undefined,
    lastNameCtrl?: string | null | undefined,
    countryOrRegionCtrl?: string | null | undefined,
    Addressline1Ctrl?: string | null | undefined,
    Addressline2Ctrl?: string | null | undefined,
    cityCtrl?: string | null | undefined,
    StateCtrl?: string | null | undefined,
    zipCodeCtrl?: string | null | undefined,
    phoneNumber?: string | null | undefined,
}
export interface AllItems {
  products: shoppingCartItems[];
  shippingMethod: string;
  addressData: addressData;
  EmailData: emailData;
}
export interface reviewSummary
{
  totalReviews: number,
  averageRating: number,
  fiveStar: number,
  fourStar: number,
  threeStar: number,
  twoStar: number,
  oneStar: number
}