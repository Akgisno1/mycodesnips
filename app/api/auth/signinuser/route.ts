import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
}
