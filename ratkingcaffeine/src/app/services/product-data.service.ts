import { Injectable } from '@angular/core';
import { Product, Filter, Coffee,Review, ApiProduct} from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable,of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
   private products: Product[] = [];
  private baseUrl = 'http://localhost:3000/api/products/all-Products';
   private products$: Observable<Product[]> = this.http
    // 1. expect an object with “products” array
    .get<{ products: ApiProduct[] }>(this.baseUrl)
    .pipe(
      // 2. pull out that array, then convert each item
      map(({ products }) =>
        products.map(api => this.transform(api))
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(err => {
        console.error('Error fetching products:', err);
        return of([]);      // fallback: empty array
      })
    );
  constructor(private http: HttpClient) {
     this.http
      .get<{ products: ApiProduct[] }>(this.baseUrl)
      .pipe(
        map(resp => resp.products.map(api => this.transform(api))),
        catchError(() => of([]))
      )
      .subscribe(arr => (this.products = arr));
   }
  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  // Transform API data to Product format
  private transform(apiProduct: ApiProduct): Product {
    let images: string[] = [];
  if (typeof apiProduct.imageUrl === 'string') {
    try {
      images = JSON.parse(apiProduct.imageUrl);
    } catch {
      console.warn('Could not parse imageUrl JSON:', apiProduct.imageUrl);
      images = [];
    }
  } else {
    images = apiProduct.imageUrl;
  }

    return {
      ...apiProduct,
      imageUrl:images,
      createdAt: apiProduct.createdAt ? new Date(apiProduct.createdAt) : undefined, // Convert string to Date
      updatedAt: apiProduct.updatedAt ? new Date(apiProduct.updatedAt) : undefined // Convert string to Date
    };
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
coffees: Coffee[] = [
  {
    id: "coffee001",
    reviews: [
      { rating: 4, comment: "Smooth and rich.", reviewer: "Alice", date: "2025-06-01" },
      { rating: 5, comment: "Amazing flavor!", reviewer: "Bob", date: "2025-06-02" }
    ]
  },
  {
    id: "coffee002",
    reviews: []
  },
  {
    id: "coffee003",
    reviews: [
      { rating: 3, comment: "A bit too acidic.", reviewer: "Charlie", date: "2025-06-03" }
    ]
  },
  {
    id: "coffee004",
    reviews: []
  },
  {
    id: "coffee005",
    reviews: [
      { rating: 2, comment: "Not my favorite.", reviewer: "Diana", date: "2025-06-03" }
    ]
  },
  {
    id: "coffee006",
    reviews: []
  },
  {
    id: "coffee007",
    reviews: [
      { rating: 5, comment: "Perfect with breakfast!", reviewer: "Eli", date: "2025-06-04" },
      { rating: 4, comment: "Really good balance.", reviewer: "Frank", date: "2025-06-04" }
    ]
  },
  {
    id: "coffee008",
    reviews: []
  },
  {
    id: "coffee009",
    reviews: [
      { rating: 3, comment: "Decent, not amazing.", reviewer: "Grace", date: "2025-06-05" }
    ]
  },
  {
    id: "coffee010",
    reviews: []
  },
  {
    id: "coffee011",
    reviews: [
      { rating: 4, comment: "Nice body and aroma.", reviewer: "Hannah", date: "2025-06-06" }
    ]
  },
  {
    id: "coffee012",
    reviews: []
  },
  {
    id: "coffee013",
    reviews: []
  },
  {
    id: "coffee014",
    reviews: [
      { rating: 2, comment: "Too strong for me.", reviewer: "Ian", date: "2025-06-07" }
    ]
  },
  {
    id: "coffee015",
    reviews: []
  },
  {
    id: "coffee016",
    reviews: [
      { rating: 5, comment: "Best I've ever had.", reviewer: "Jane", date: "2025-06-07" }
    ]
  },
  {
    id: "coffee017",
    reviews: []
  },
  {
    id: "coffee018",
    reviews: [
      { rating: 3, comment: "Okay taste, good price.", reviewer: "Kyle", date: "2025-06-08" }
    ]
  },
  {
    id: "coffee019",
    reviews: []
  },
  {
    id: "coffee020",
    reviews: [
      { rating: 4, comment: "Smooth with chocolate notes.", reviewer: "Laura", date: "2025-06-08" }
    ]
  }
];
private reviewsChanged = new Subject<string>();
// reviewsChanged is both an observable which mean one can subscribe to it and an observer one can push to it
//every event pushed will be a string 
reviewsChanged$ = this.reviewsChanged.asObservable();
//the line above should convert the subject into a plain observable, consumers can sub to it but cant call next
// this can enforce encapsulation, only the service emits events
getSortedReviews(id: string, sort: string) {//Sort by in pagination review component
  const coffee =this.coffees.find(index => index.id === id);
    if (coffee){
      if(sort === "rating")
      {
        const reviewCopy =  coffee.reviews.slice();//not mutating original
        return reviewCopy.sort((a, b) => b.rating - a.rating);
        //sorts based on greater rating
        
      }
      else if(sort === "date")
      {
        const reviewCopy =  coffee.reviews.slice();
        return reviewCopy.sort((a, b) => { 
          const timeA = new Date(a.date).getTime();//determines the number of milliseconds since the epoch 
          const timeB = new Date(b.date).getTime();//sorts based off that
          return timeB - timeA;
        });
      }
      else {
        const reviewCopy =  coffee.reviews.slice();
        //this sorts A-Z, localeCompare returns a number based on if the string comes before or after.
        //make sure both a and b are lowercase because this could effect the ascii
        return reviewCopy.sort((a, b) => a.reviewer.toLowerCase().localeCompare(b.reviewer.toLowerCase()));
      }
    }
  return [];
}
get_Total_Reviews_per_score(score: number, id: string){
  const coffee =this.coffees.find(index => index.id === id);
  if (coffee)
   return coffee.reviews.filter(index => index.rating ===score).length;
  return 0;
}
get_Total_Reviews (id: string)
{
  const coffee =this.coffees.find(index => index.id === id);
  if (coffee)
    return coffee.reviews.length;
  return 0;
}
getReviewsById(id: string) {
  const coffee =this.coffees.find(index => index.id === id);
  if (coffee)
    return coffee.reviews;
  return [];
}

getProduct(id: string) : Product | undefined
{
  return this.products.find(item => item.id === id);
}
addReview(id:string ,rev: Review)
{
  const coffee =this.coffees.find(index => index.id === id);
  if (coffee)
    {
    coffee.reviews.push(rev);
    console.log(coffee.reviews);
    this.reviewsChanged.next(id);
  }
}

getFilter() {
  return this.filters;
}

}

