import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/product`);
    
  }
}//in the component level one can use the providers field for services such as "providers: [HeroService]"
//when you register a provider at the component level, you get a new instance of the service with 
//each new instance of that component.
// a service can be a way to interact with the data, instead of each component having a copy of the product data a service
//can be responsible for retrieve this data. 