import { User } from "@/models/User.model"; // Adjust the path as necessary
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("authorId");
    if (!id) {
      return NextResponse.json("user parameter is required", { status: 400 });
    }

    await connectDB();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    return NextResponse.json("Database Error", { status: 500 });
  }
}
