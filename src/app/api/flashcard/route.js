import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import FlashCard from "@/app/models/FlashCard";
import User from "@/app/models/User"; // Import the User model
import connectDB from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const duplicate = await FlashCard.findOne({ userId: user._id });
    if (duplicate) {
      return NextResponse.json(
        {
          error: "You already have a flashcard",
          message: "Please delete your existing card before creating a new one",
        },
        { status: 409 }
      );
    }

    const data = await req.json();

    const flashcard = new FlashCard({
      userId: user._id,
      username: user.username,
      socialLinks: data.socialLinks.map((link) => ({
        platform: link.platform,
        link: link.link,
      })),
      cardsDetails: [
        {
          gradient: data.gradient,
          textColor: data.textColor,
          borderColor: data.borderColor,
          avatarBorder: data.avatarBorder,
          linksStyle: data.linksStyle,
        },
      ],
    });

    const savedCard = await flashcard.save();
    return NextResponse.json({
      message: "Flashcard created successfully",
      data: savedCard,
    });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create flashcard" },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const flashcards = await FlashCard.find({ userId: user._id });

    return NextResponse.json(flashcards);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const data = await request.json();

    const flashcard = await FlashCard.findOneAndUpdate(
      { userId: data.userId },
      {
        socialLinks: data.socialLinks,
        cardsDetails: data.cardsDetails,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const data = await request.json();

    await FlashCard.findOneAndDelete({ userId: data.userId });

    return NextResponse.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
}
