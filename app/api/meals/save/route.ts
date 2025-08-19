import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function POST(request: Request) {
  try {
    const { meals } = await request.json();

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Delete existing meals
      await client.query("DELETE FROM meals");

      // Insert new meals
      for (const meal of meals) {
        await client.query(
          `
          INSERT INTO meals (
            id, name, price, original_price, description, components,
            image, category, popular, stock_left
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
          [
            meal.id,
            meal.name,
            meal.price,
            meal.originalPrice || null,
            meal.description,
            meal.components,
            meal.image,
            meal.category,
            meal.popular,
            meal.stockLeft,
          ]
        );
      }

      await client.query("COMMIT");
      return NextResponse.json({ success: true });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error saving meals:", error);
    return NextResponse.json(
      { error: "Failed to save meals" },
      { status: 500 }
    );
  }
}