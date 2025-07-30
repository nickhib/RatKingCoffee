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
  return db.get('SELECT * FROM products WHERE id = ?', [id]);
}
