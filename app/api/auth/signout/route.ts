import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut({ redirect: false });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error during sign-out:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
