import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image from URL" },
        { status: 400 }
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (
      !contentType ||
      !validTypes.some((type) => contentType.includes(type))
    ) {
      return NextResponse.json(
        {
          error: "Invalid image type. Only JPEG, PNG, and WebP are supported.",
        },
        { status: 400 }
      );
    }

    // Get file extension from content type or URL
    let extension = ".jpg";
    if (contentType.includes("png")) extension = ".png";
    else if (contentType.includes("webp")) extension = ".webp";
    else if (contentType.includes("jpeg") || contentType.includes("jpg"))
      extension = ".jpg";

    const buffer = await response.arrayBuffer();

    // Check file size (max 10MB for URLs)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (buffer.byteLength > maxSize) {
      return NextResponse.json(
        { error: "Image too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const filename = `meal-url-${timestamp}${extension}`;

    // Save to public/uploads directory
    const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(uploadPath, Buffer.from(buffer));

    // Return the local URL
    const localImageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl: localImageUrl,
      originalUrl: imageUrl,
      message: "Image downloaded and saved successfully",
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    return NextResponse.json(
      { error: "Failed to download and save image" },
      { status: 500 }
    );
  }
}
