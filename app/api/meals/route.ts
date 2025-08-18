import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data", "recipes.json");
    const fileContents = fs.readFileSync(dataPath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading recipes file:", error);
    return NextResponse.json(
      { error: "Failed to load recipes" },
      { status: 500 }
    );
  }
}
