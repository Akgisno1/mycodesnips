import { Snip } from "@/models/Snip.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    await connectDB();
    const snips = await Snip.find({
      title: { $regex: query, $options: "i" },
    }).sort({ createdAt: -1 });

    return NextResponse.json(snips);
  } catch (error) {
    return NextResponse.json("Database Error", { status: 500 });
  }
}
