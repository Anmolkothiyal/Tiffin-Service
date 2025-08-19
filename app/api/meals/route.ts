import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM meals");
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

    return NextResponse.json({ meals });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Failed to load meals" },
      { status: 500 }
    );
  }
}