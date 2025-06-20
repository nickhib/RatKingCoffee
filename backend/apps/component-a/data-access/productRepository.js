import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;
async function getDb() {
  if (!db) {
    db = await open({ filename: './data.sqlite', driver: sqlite3.Database });
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
    `);
  }
  return db;
}

export async function fetchAll() {
  return (await getDb()).all('SELECT * FROM products');
}

export async function fetchById(id) {
  return (await getDb()).get('SELECT * FROM products WHERE id = ?', [id]);
}