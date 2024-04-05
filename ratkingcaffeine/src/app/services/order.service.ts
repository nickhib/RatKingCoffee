import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order,CartWithProduct } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/cart_item';
  constructor(private http: HttpClient) { }
  addCartItem(cartItem: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, cartItem);
  }
  getCartItems(): Observable<CartWithProduct[]> {
    return this.http.get<CartWithProduct[]>(this.apiUrl);
  }
  deleteCartItem(cartItemId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${cartItemId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {} // Empty JSON object
    };
    
    return this.http.delete(deleteUrl, httpOptions);
  }
  
}
