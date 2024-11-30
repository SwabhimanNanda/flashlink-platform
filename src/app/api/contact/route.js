import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/Contact";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    // Validate the form fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", data: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
