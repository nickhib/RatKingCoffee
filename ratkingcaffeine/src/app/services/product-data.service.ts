import { Injectable } from '@angular/core';
import { Product, Filter, Coffee,Review, ApiProduct,reviewSummary} from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable,of,BehaviorSubject } from 'rxjs';
import { tap,map, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private products: Product[] = [];
  private productCache: ApiProduct[] | null = null;
  private productSubject = new BehaviorSubject< ApiProduct[]>([]);
  private reviewSubject = new BehaviorSubject< Review []>([]);
  //create a subject for review summary so we can make sure we get the data when it changes. 
  private summarySubject = new BehaviorSubject<reviewSummary>(
    {
      totalReviews: 0,
      averageRating: 0,
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0
    }
  );
  summaryChange$ = this.summarySubject.asObservable();
  productChanged$ = this.productSubject.asObservable();
  reviewChanged$ = this.reviewSubject.asObservable();
  private reviewsChanged = new Subject<void>();  
  reviewsChanged$ = this.reviewsChanged.asObservable();
   //$ is just part of the naming convention
  private prefetch$: Observable<ApiProduct[]> | null = null;
  
  private baseUrl = 'http://localhost:3000/api/products/';
   
  constructor(private http: HttpClient) {}
   preFetchProducts(): void 
   {
    const url =  `${this.baseUrl}all-products`;
    if(!this.productCache && !this.prefetch$)
    {
      this.prefetch$ = this.http.get<{products: ApiProduct []}>(url).pipe( 
        map( response => response.products),
        tap(products => {
          this.productCache = products;
          this.productSubject.next([...this.productCache]);
        }
      ),//to emit saved emited values to newly subscribed components
      shareReplay(1)
      );
    }
   }
   getProductListLength() {
    if(this.productCache)
      return this.productCache?.length;
    return 0;
   }
    getProducts(): Observable<ApiProduct []> 
    {
      if(this.productCache)
      {
        this.productSubject.next([...this.productCache]);
        return of(this.productCache);
      }
      if(!this.prefetch$)
      {
        this.preFetchProducts();
      }
      return this.prefetch$!;
    }
    clearProductCache(): void 
    {
      this.productCache = null;
    }
  
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

  // Cached Observable for products

///////////Coffee review dummy data /////////////////////////

// reviewsChanged is both an observable which mean one can subscribe to it and an observer one can push to it
//every event pushed will be a string 
//the line above should convert the subject into a plain observable, consumers can sub to it but cant call next
// this can enforce encapsulation, only the service emits events

get_ReviewSummary(productId: string) : Observable<reviewSummary>{
  const url = `http://localhost:3000/api/products/${ productId }/reviews/summary`;
  return this.http.get<{summary: reviewSummary []}>(url).pipe( 
    map(res => res.summary[0]),
        tap(summary => {
          this.summarySubject.next(summary);
          console.log("reviews summary",summary);
        }
      ));//get reactive updates.
}


getReviewsById(id: string , sort: string) {
   const url = `http://localhost:3000/api/products/${ id }/reviews?sort=${sort}`;
     return this.http.get<{reviews: Review []}>(url).pipe( 
    map(res => res.reviews),
        tap(reviews=> {
          this.reviewSubject.next(reviews);
        }
      ));
}

getProduct(id: string) : Observable<ApiProduct>
{
  const found = this.productCache?.find(item => item.id === id);
  const url = `${this.baseUrl}${id}`; 
  if(found)//if we find it in cache just return else we will look it up. 
  {
    return of(found);//returns item if its already in cache so we dont have to do a backend call. 
  }
   return this.http.get<{ product: ApiProduct}>(url).pipe(
    map(response => response.product), 
  tap(data => console.log('Fetched product:', data),
));
}
addReview(id:string ,rev: Review)
{
  const url = `http://localhost:3000/api/products/${ id }/reviews`;
      this.http.post<Review>(url ,rev  ).pipe(
      tap((newReview) => {
        this.reviewSubject.next([...this.reviewSubject.getValue(),newReview]);
      })).subscribe();
}

getFilter() {
  return this.filters;
}

}

