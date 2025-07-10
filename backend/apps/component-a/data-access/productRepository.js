import { getDatabase } from './getDatabase.js';


export async function fetchAll() {
  const db = await getDatabase();
  return db.all('SELECT * FROM products');
}

export async function fetchById(id) {
  const db = await getDatabase();
  return db.get('SELECT * FROM products WHERE id = ?', [id]);
}