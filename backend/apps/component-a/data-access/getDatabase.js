import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;
const dbFile = process.env.DB_FILE || 'data.sqlite';
console.log(`Connecting to database at: ${dbFile}`);
export async function getDatabase() {
  if (!db) {
    db = await open({ filename: dbFile, driver: sqlite3.Database });
    
  }
  return db;
}