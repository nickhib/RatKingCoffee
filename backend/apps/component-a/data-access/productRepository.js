import { getDatabase } from './getDatabase.js';


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
