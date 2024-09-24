import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    // Check if the sign-in was successful
    if (result?.error) {
      // If there's an error from signIn, return an error response
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 401 } // Unauthorized
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Ensure that we return a proper Response object on error
    const someError = error as CredentialsSignin;

    return NextResponse.json(
      {
        success: false,
        message: someError.cause?.message || "An error occurred.",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
