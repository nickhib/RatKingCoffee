export interface Order {
    id?: number;
    session_id: number;
    product_id: number;
    quantity: number;
    created_at: string; // Assuming created_at is a string in ISO 8601 format
    modified_at: string; // Assuming modified_at is a string in ISO 8601 format
}
export interface CartWithProduct {
    id: number;
    session_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    modified_at: string;
    product_name: string;
    price: number;
    description: string;
  }
  


