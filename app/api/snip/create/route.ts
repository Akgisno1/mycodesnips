import { auth } from "@/auth";
import { Snip } from "@/models/Snip.model";
import { User } from "@/models/User.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    await connectDB();
    const session = await auth();

    const user = await User.findOne({ email: session?.user?.email });
    await Snip.create({
      title,
      content,
      authorId: user._id,
    });
    console.log("snip created successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("error during snip creation", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await connectDB();
    await Snip.deleteOne({ _id: id });
    console.log("snip deleted successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("error during snip deletion", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
