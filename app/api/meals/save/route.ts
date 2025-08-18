import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const { meals } = await request.json();

    const dataPath = path.join(process.cwd(), "data", "recipes.json");

    // Read current data
    const fileContents = fs.readFileSync(dataPath, "utf8");
    const data = JSON.parse(fileContents);

    // Update meals
    data.meals = meals;

    // Write back to file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving meals:", error);
    return NextResponse.json(
      { error: "Failed to save meals" },
      { status: 500 }
    );
  }
}
