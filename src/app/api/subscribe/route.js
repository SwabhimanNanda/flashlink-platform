import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import EmailModel from "@/app/models/Email";

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const existingEmail = await EmailModel.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 409 }
      );
    }

    const newEmail = new EmailModel({ email });
    await newEmail.save();

    return NextResponse.json(
      { message: "Email saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
