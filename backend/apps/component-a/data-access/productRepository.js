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
export async function fetchReviewsById(id) {
    const db = await getDatabase();
    const rows = await db.all('SELECT * FROM reviews WHERE coffee_id = ?', [id]);
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
