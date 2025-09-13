import { getDatabase } from './getDatabase.js';
// cheatsheet
//db.run is used for statements that modify the database (INSERT, UPDATE, DELETE).
//db.get() returns a single row
//db.all() → returns an array of rows

export async function fetchAll() {//get all products
  const db = await getDatabase();
  const rows = await db.all('SELECT * FROM products');
  
  return rows.map(row => ({
    ...row,
    imageUrl: JSON.parse(row.imageUrl),
    isAvailable: Boolean(row.isAvailable),
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  }));
 
}
export async function fetchReviewsByReviewer(id) {
    const db = await getDatabase();
    const rows = await db.all('SELECT * FROM reviews WHERE coffee_id = ? ORDER BY reviewer ASC', [id]);
    return rows;
}
export async function fetchReviewsByDate(id) {
    const db = await getDatabase();
    const rows = await db.all('SELECT * FROM reviews WHERE coffee_id = ? ORDER BY date ASC', [id]);
    return rows;
}
export async function fetchReviewsByRating(id) {
    const db = await getDatabase();
    const rows = await db.all('SELECT * FROM reviews WHERE coffee_id = ? ORDER BY rating ASC', [id]);
    return rows;
}
export async function fetchSummaryById(id) {
   const db = await getDatabase();
   const rows = await db.all(
    `SELECT COUNT(*) AS totalReviews,
      AVG(rating) AS averageRating,
      SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS fiveStar,
      SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS fourStar,
      SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS threeStar,
      SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS twoStar,
      SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS oneStar
       FROM reviews WHERE coffee_id = ?
      `,[id]
   );

    return rows;
}
export async function postReview(item,id) {
  /* 
        CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coffee_id TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        reviewer TEXT,
        date TEXT,
        UNIQUE(coffee_id,reviewer,comment,date)
      );

    await db.run('INSERT INTO cart_items (cart_id,product_id, quantity) VALUES ($cartId, $productId,$quantity) ON CONFLICT(cart_id,product_id) DO UPDATE SET quantity= excluded.quantity',
    {
      $cartId: cartId,
      $productId: item.id,
      $quantity: item.quantity,
    });
  
  */
 try{
  const db = await getDatabase();
  await db.run('INSERT INTO reviews (coffee_id , rating, comment, reviewer, date ) VALUES ($coffee_id, $rating,$comment,$reviewer,$date)',
    {
      $coffee_id: id,
      $rating: item.rating,
      $comment: item.comment,
      $reviewer: item.reviewer,
      $date: item.date
    }
  );
  return { success: true, message: "review added"};
 }
 catch(err)
 {
    console.error("error review couldnt add" ,err);
    return {success: false, message: err};
 }

}

export async function fetchById(id) {
  const db = await getDatabase();
  const rows = await db.get('SELECT * FROM products WHERE id = ?', [id]);
  return {
    ...rows,
    imageUrl: JSON.parse(rows.imageUrl),
    isAvailable: Boolean(rows.isAvailable),
    createdAt: new Date(rows.createdAt),
    updatedAt: new Date(rows.updatedAt),
  }
}
