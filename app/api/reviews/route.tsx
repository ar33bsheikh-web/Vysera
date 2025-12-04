import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { z } from 'zod';

// Initialize DB (file will be created at project root)
const db = new Database('vysera.db');

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId TEXT NOT NULL,
    rating INTEGER NOT NULL,
    author TEXT NOT NULL,
    title TEXT,
    body TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  author: z.string().min(2),
  title: z.string().optional(),
  body: z.string().min(10),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 });

  const reviews = db.prepare('SELECT * FROM reviews WHERE productId = ? ORDER BY createdAt DESC').all(productId);
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = reviewSchema.parse(body);

    const stmt = db.prepare('INSERT INTO reviews (productId, rating, author, title, body) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(data.productId, data.rating, data.author, data.title || '', data.body);

    return NextResponse.json({ success: true, id: info.lastInsertRowid });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}