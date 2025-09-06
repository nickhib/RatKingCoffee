import { getDatabase } from './getDatabase.js'

async function defaultProducts()
{
  const db = await getDatabase();
const products = [ 
      {
    title: "Espresso Roast",
    description: "Rich, caramelly espresso blend with a bold flavor profile.",
    imageUrl: ["assets/image3.jpg","assets/image3.jpg","assets/duke-son.jpg"],
    price: 12.99,
    category: "Whole Bean",
    id: "coffee001",
    rating: 4.7,
    stock: 120,
    isAvailable: true,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-10"),
    discountPercentage: 10,
    sku: "WB-ESP-001"
  },
  {
    title: "French Roast",
    description: "Dark roasted with smoky, bold undertones.",
    imageUrl: ["assets/image3.jpg"],
    price: 13.49,
    category: "Ground",
    id: "coffee002",
    rating: 4.5,
    stock: 85,
    isAvailable: true,
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2025-01-03"),
    discountPercentage: 0,
    sku: "GR-FRCH-002"
  },
  {
    title: "Colombian Medium Roast",
    description: "Smooth and balanced with hints of caramel and cocoa.",
    imageUrl: ["assets/image3.jpg"],
    price: 11.99,
    category: "Whole Bean",
    id: "coffee003",
    rating: 4.6,
    stock: 200,
    isAvailable: true,
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-15"),
    discountPercentage: 5,
    sku: "WB-COL-003"
  },
  {
    title: "Cold Brew Blend",
    description: "Specially crafted blend for smooth cold brews.",
    imageUrl: ["assets/image3.jpg"],
    price: 14.99,
    category: "Ground",
    id: "coffee004",
    rating: 4.8,
    stock: 60,
    isAvailable: true,
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2025-01-01"),
    discountPercentage: 15,
    sku: "GR-CB-004"
  },
  {
    title: "Vanilla Flavored Coffee",
    description: "Medium roast with natural vanilla flavoring.",
    imageUrl: ["assets/image3.jpg"],
    price: 13.99,
    category: "Flavored",
    id: "coffee005",
    rating: 4.4,
    stock: 110,
    isAvailable: true,
    createdAt: new Date("2024-10-05"),
    updatedAt: new Date("2024-12-10"),
    discountPercentage: 0,
    sku: "FL-VAN-005"
  },
  {
    title: "Hazelnut Blend",
    description: "Nutty and sweet with a warm hazelnut finish.",
    imageUrl: ["assets/image3.jpg"],
    price: 12.49,
    category: "Flavored",
    id: "coffee006",
    rating: 4.3,
    stock: 95,
    isAvailable: true,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-18"),
    discountPercentage: 5,
    sku: "FL-HAZ-006"
  },
  {
    title: "Italian Roast",
    description: "Intensely dark roasted for a full-bodied, bold cup.",
    imageUrl: ["assets/image3.jpg"],
    price: 13.25,
    category: "Whole Bean",
    id: "coffee007",
    rating: 4.6,
    stock: 130,
    isAvailable: true,
    createdAt: new Date("2024-09-25"),
    updatedAt: new Date("2024-11-30"),
    discountPercentage: 8,
    sku: "WB-ITL-007"
  },
  {
    title: "Breakfast Blend",
    description: "Mild and smooth, perfect for your morning routine.",
    imageUrl: ["assets/image3.jpg"],
    price: 11.49,
    category: "Ground",
    id: "coffee008",
    rating: 4.2,
    stock: 180,
    isAvailable: true,
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-22"),
    discountPercentage: 0,
    sku: "GR-BFST-008"
  },
  {
    title: "Decaf House Blend",
    description: "Same great flavor without the caffeine.",
    imageUrl: ["assets/image3.jpg"],
    price: 12.75,
    category: "Decaf",
    id: "coffee009",
    rating: 4.1,
    stock: 150,
    isAvailable: true,
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-12-01"),
    discountPercentage: 5,
    sku: "DF-HSE-009"
  },
  {
    title: "Pumpkin Spice",
    description: "Limited edition seasonal favorite with warm spices.",
    imageUrl: ["assets/image3.jpg"],
    price: 14.50,
    category: "Flavored",
    id: "coffee010",
    rating: 4.7,
    stock: 45,
    isAvailable: true,
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-10-15"),
    discountPercentage: 20,
    sku: "FL-PS-010"
  },
  {
    title: "Guatemalan Single Origin",
    description: "Bright acidity with hints of chocolate and spice.",
    imageUrl: ["assets/image3.jpg"],
    price: 15.99,
    category: "Single Origin",
    id: "coffee011",
    rating: 4.8,
    stock: 100,
    isAvailable: true,
    createdAt: new Date("2024-12-18"),
    updatedAt: new Date("2025-01-02"),
    discountPercentage: 10,
    sku: "SO-GUA-011"
  },
  {
    title: "Ethiopian Light Roast",
    description: "Floral notes with bright citrus and tea-like body.",
    imageUrl: ["assets/image3.jpg"],
    price: 16.49,
    category: "Single Origin",
    id: "coffee012",
    rating: 4.9,
    stock: 75,
    isAvailable: true,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-25"),
    discountPercentage: 0,
    sku: "SO-ETH-012"
  },
  {
    title: "Mocha Java Blend",
    description: "Classic blend with rich body and earthy undertones.",
    imageUrl: ["assets/image3.jpg"],
    price: 13.99,
    category: "Blends",
    id: "coffee013",
    rating: 4.5,
    stock: 90,
    isAvailable: true,
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-12-15"),
    discountPercentage: 7,
    sku: "BL-MJ-013"
  },
  {
    title: "Caramel Drizzle",
    description: "Sweet caramel flavor in a smooth, medium roast base.",
    imageUrl: ["assets/image3.jpg"],
    price: 12.99,
    category: "Flavored",
    id: "coffee014",
    rating: 4.3,
    stock: 110,
    isAvailable: true,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-20"),
    discountPercentage: 5,
    sku: "FL-CAR-014"
  },
  {
    title: "Sumatra Dark Roast",
    description: "Earthy and herbal with a rich, lingering finish.",
    imageUrl: ["assets/image3.jpg"],
    price: 14.25,
    category: "Single Origin",
    id: "coffee015",
    rating: 4.7,
    stock: 95,
    isAvailable: true,
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-25"),
    discountPercentage: 10,
    sku: "SO-SUM-015"
  },
  {
    title: "Toffee Nut Crunch",
    description: "Toffee nut flavor with sweet, roasted notes.",
    imageUrl: ["assets/image3.jpg"],
    price: 13.75,
    category: "Flavored",
    id: "coffee016",
    rating: 4.4,
    stock: 100,
    isAvailable: true,
    createdAt: new Date("2024-11-12"),
    updatedAt: new Date("2024-12-28"),
    discountPercentage: 8,
    sku: "FL-TNF-016"
  },
  {
    title: "Dark Chocolate Mocha",
    description: "Decadent blend with dark chocolate notes.",
    imageUrl: ["assets/image3.jpg"],
    price: 14.75,
    category: "Whole Bean",
    id: "coffee017",
    rating: 4.6,
    stock: 85,
    isAvailable: true,
    createdAt: new Date("2024-12-09"),
    updatedAt: new Date("2025-01-04"),
    discountPercentage: 5,
    sku: "FL-MCH-017"
  },
  {
    title: "Organic Peruvian Roast",
    description: "Smooth and clean with nutty, cocoa tones. Certified organic.",
    imageUrl: ["assets/image3.jpg"],
    price: 15.49,
    category: "Dark Roast",
    id: "coffee018",
    rating: 4.8,
    stock: 70,
    isAvailable: true,
    createdAt: new Date("2024-12-28"),
    updatedAt: new Date("2025-01-15"),
    discountPercentage: 12,
    sku: "ORG-PER-018"
  },
  {
    title: "Instant Coffee Pack",
    description: "Convenient single-serve instant coffee sticks.",
    imageUrl: ["assets/image3.jpg"],
    price: 10.99,
    category: "Ready to Drink",
    id: "coffee019",
    rating: 4.0,
    stock: 140,
    isAvailable: true,
    createdAt: new Date("2024-10-10"),
    updatedAt: new Date("2024-12-20"),
    discountPercentage: 0,
    sku: "INS-COF-019"
  },
  {
    title: "Holiday Spice Blend",
    description: "Warm blend of cinnamon, nutmeg, and clove flavors.",
    imageUrl: ["assets/image3.jpg"],
    price: 13.25,
    category: "Dark Roast",
    id: "coffee020",
    rating: 4.6,
    stock: 50,
    isAvailable: true,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2025-01-01"),
    discountPercentage: 15,
    sku: "SEA-HSP-020"
  }
];
const reviews = [
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
    const insert = `INSERT OR IGNORE INTO products (id ,title, description,imageUrl ,price,category,rating,stock, isAvailable, createdAt, updatedAt, discountPercentage , sku ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const reviewInsert = `INSERT OR IGNORE INTO reviews (id,coffee_id, rating,comment ,reviewer,date) VALUES(?,?,?,?,?,?)`;

    for(const r of reviews)
    {
  
      for(const c of r.reviews){
      await db.run(reviewInsert, [
        c.id,
        r.id,
        c.rating,
        c.comment,
        c.reviewer,
        c.date
      ]);
    }
    }

    for(const p of products)
    {
       await db.run(insert, [
    p.id,
    p.title,
    p.description,
    JSON.stringify(p.imageUrl),
    p.price,
    p.category,
    p.rating,
    p.stock,
    p.isAvailable ? 1 : 0,
    p.createdAt.toISOString(),
    p.updatedAt.toISOString(),
    p.discountPercentage,
    p.sku
  ]);
    }
}
/*
export interface shoppingCartItems {
  id: string;
  quantity: number;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
}
*/
export async function initDb() {
  const db = await getDatabase();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL, -- Stored as a JSON string
        price REAL NOT NULL,
        category TEXT,
        rating REAL,
        stock INTEGER,
        isAvailable BOOLEAN DEFAULT 1,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        discountPercentage REAL,
        sku TEXT UNIQUE
    );
      CREATE TABLE IF NOT EXISTS cart (
        id TEXT PRIMARY KEY
      );
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id TEXT,
        product_id TEXT,
        quantity INTEGER,
        FOREIGN KEY (product_id) REFERENCES products(id),
        UNIQUE(cart_id, product_id)
      );
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coffee_id TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        reviewer TEXT,
        date TEXT,
        UNIQUE(coffee_id,reviewer,comment,date)
      );
    `);//when finding correct reviews one needs to SELECT * FROM reviews WHERE coffee_id = value
    /* can add not null to make sure the values arent null*/
    await defaultProducts();
}

// may want to create a migrate system instead of running this every launch
// could create a image table and for imagesurl just reference that.
