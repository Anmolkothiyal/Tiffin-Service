// app/api/meals/route.js
import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

// Force dynamic rendering - prevents all caching
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  // Add cache-busting query with timestamp
  const timestamp = Date.now();
  
  try {
    const result = await pool.query(`
      SELECT *, '${timestamp}' as cache_buster 
      FROM meals 
      ORDER BY id
    `);
    
    const meals = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      originalPrice: row.original_price ? parseFloat(row.original_price) : undefined,
      description: row.description,
      components: row.components,
      image: row.image,
      category: row.category,
      popular: row.popular,
      stockLeft: row.stock_left,
    }));

    return new NextResponse(
      JSON.stringify({ 
        meals,
        timestamp,
        cacheBuster: Math.random() 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      }
    );
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Failed to load meals" },
      { status: 500 }
    );
  }
}