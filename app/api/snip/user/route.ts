import { Snip } from "@/models/Snip.model";
import { User } from "@/models/User.model";

import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const userEmail = searchParams.get("email"); // Extract email from query

  try {
    await connectDB();
    const user = await User.findOne({ email: userEmail }); // Use extracted email
    if (!user) {
      return NextResponse.json("No user in database", { status: 500 });
    }

    const snips = await Snip.find({
      title: { $regex: query, $options: "i" },
      authorId: user.id,
    });

    return NextResponse.json(snips);
  } catch (error) {
    return NextResponse.json("Database Error", { status: 500 });
  }
}
