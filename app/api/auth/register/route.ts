import { User } from "@/models/User.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // connect to db
    await connectDB();
    // check exiting user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }
    // create new user
    const hashedPassword = await hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("user created successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("error during registration", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
