import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product,homeProduct } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/product';
  private apiUrl2 = 'http://localhost:3000/api/home-products';
  private apiUrl3 = 'http://localhost:3000/api/allproduct';
  /* putting httpclient in the constructor will just inject our Dependency of it for the class */
  constructor(private http: HttpClient) { }
/// Product was defined in the product model this is to make sure that we received the disired results. 
  getProducts(): Observable<Product[]> {//a method to recieve the array of products asynchronously.
    return this.http.get<Product[]>(this.apiUrl);// products will remain empty if nothing is in it 
  }
  getrangeProducts(startId: number, endId: number): Observable<Product[]> {//a method to recieve the array of products asynchronously.
    let params = new HttpParams()
    .set('startId', startId.toString())
    .set('endId', endId.toString());
    return this.http.get<Product[]>(this.apiUrl, { params: params });// products will remain empty if nothing is in it 
  }
  createProduct(product: Product): Observable<Product> {// will add a product to the database. 
    return this.http.post<Product>(this.apiUrl, product);
  }
  getTotalProduct(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl3}`);
  }
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/?id=${id}`;/* $ is used in template literals to perform string interpolation.
    template literals are enclosed byu backticks (' ')  instead of single or double quotes 
    when `${}` is used inside a template literal one can embed expressions or variables within the string.
    this allows us to insert values dynamically into the string */ 
    return this.http.get<Product>(url);
  }
  getHomeProducts(): Observable<homeProduct[]> {//a method to recieve the array of products asynchronously.
    return this.http.get<homeProduct[]>(this.apiUrl2);// products will remain empty if nothing is in it 
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
