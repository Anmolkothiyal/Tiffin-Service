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

export async function DELETE(request : any) {
  try {
    // Get meal ID from query params or request body
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Meal ID is required" },
        { status: 400 }
      );
    }

    // Delete the meal from database
    const result = await pool.query(
      "DELETE FROM meals WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Meal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Meal deleted successfully",
        deletedMeal: result.rows[0]
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );

  } catch (error) {
    console.error("Error deleting meal:", error);
    return NextResponse.json(
      { error: "Failed to delete meal" },
      { status: 500 }
    );
  }
}