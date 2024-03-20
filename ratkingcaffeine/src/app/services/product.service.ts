import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/product';
  constructor(private http: HttpClient) { }
/// Product was defined in the product model this is to make sure that we received the disired results. 
  getProducts(): Observable<Product[]> {//a method to recieve the array of products asynchronously.
    return this.http.get<Product[]>(this.apiUrl);// products will remain empty if nothing is in it 
  }
  createProduct(product: Product): Observable<Product> {// will add a product to the database. 
    return this.http.post<Product>(this.apiUrl, product);
  }
  /* at a later date
   // Method to update an existing product
  updateProduct(productId: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<Product>(url, product);
  }

  // Method to delete a product
  deleteProduct(productId: number): Observable<void> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url);
  }
  */
}
