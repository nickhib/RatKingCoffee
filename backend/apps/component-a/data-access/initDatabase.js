import { getDatabase } from './getDatabase.js'
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
    `);
}