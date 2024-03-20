export interface Product {
    id: number; // Auto-incremented primary key
    name: string;
    description: string;
    SKU: string;
    category_id: number; // Foreign key referencing product_category table
    inventory_id: number; // Foreign key referencing product_inventory table
    price: number;
    discount_id: number; // Foreign key referencing discount table
    created_at: string; // Defaulted to CURRENT_TIMESTAMP
    modified_at: string; // Defaulted to CURRENT_TIMESTAMP
    deleted_at: string; // Defaulted to CURRENT_TIMESTAMP
  }

  //a model interface to represent the structure of the home product data
export interface HomeProduct {//can add more attributes as needed in the furture. 
  id: number;
  name: string;
  description: string;
  price: number;
}

  
  export interface ProductCategory {
    id: number; // Auto-incremented primary key
    name: string;
    description: string;
    created_at: string; // Defaulted to CURRENT_TIMESTAMP
    modified_at: string; // Defaulted to CURRENT_TIMESTAMP
    deleted_at: string; // Defaulted to CURRENT_TIMESTAMP
  }

  export interface ProductInventory {
    id: number; // Auto-incremented primary key
    quantity: number;
    description: string;
    created_at: string; // Defaulted to CURRENT_TIMESTAMP
  }

  export interface Discount {
    id: number; // Auto-incremented primary key
    name: string;
    description: string;
    discount_precent: number; // Decimal number
    active: boolean;
    created_at: string; // Defaulted to CURRENT_TIMESTAMP
    modified_at: string; // Defaulted to CURRENT_TIMESTAMP
    deleted_at: string; // Defaulted to CURRENT_TIMESTAMP
  }
  
  
  