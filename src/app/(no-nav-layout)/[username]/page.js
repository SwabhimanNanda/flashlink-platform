import FlashCard from "../../models/FlashCard";
import User from "../../models/User";
import connectDB from "../../lib/mongodb";
import ClipboardCopy from "@/app/Components/ClipboardCopy";
import PromoBanner from "@/app/Components/PromoBanner";
export default async function UserProfile({ params }) {
  const { username } = await params;

  await connectDB();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return (
        <div className="h-svh w-full flex justify-center items-center flex-col bg-gradient-to-br from-teal-200 to-blue-300 rounded-lg shadow-lg text-center">
          <h2 className="text-5xl font-bold mb-2">{username}&#39;s Profile</h2>
          <p className="text-gray-600">No flashlinks found.</p>
        </div>
      );
    }
    const flashcard = await FlashCard.findOne({ userId: user._id }).populate(
      "userId"
    );
    if (!flashcard) {
      return (
        <div className="h-svh w-full flex justify-center items-center flex-col bg-gradient-to-br from-teal-200 to-blue-300 rounded-lg shadow-lg text-center">
          <h2 className="text-5xl font-bold mb-2">{username}&#39;s Profile</h2>
          <p className="text-gray-600">No flashlinks found.</p>
        </div>
      );
    }

    const { socialLinks, cardsDetails } = flashcard;
    const cardStyle = cardsDetails[0]; // Assuming there is at least one card detail

    return (
      <div
        className={`w-screen h-svh  p-8 shadow-lg text-center flex flex-col items-center ${cardStyle.gradient} border-2 ${cardStyle.borderColor} `}
      >
        <div
          className={`flex justify-center border h-[90px] w-[90px] rounded-full ${cardStyle.avatarBorder} relative`}
        >
          <div className="flex justify-center items-center h-full w-full rounded-full bg-white text-2xl">
            {user?.name?.slice(0, 1).toUpperCase()}
          </div>

          <div className="absolute top-0 left-[150px] lg:left-[230px]  ">
            <ClipboardCopy url={username} />
          </div>
        </div>
        <p className={`text-lg font-medium mt-4 ${cardStyle.textColor}`}>
          @{username}
        </p>
        <div className="mt-8 lg:mt-6 space-y-5 lg:space-y-7">
          {socialLinks && socialLinks.length > 0 ? (
            socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardStyle.linksStyle} ${cardStyle.textColor} font-semibold hover:bg-opacity-80 transition w-[260px] lg:w-[500px] h-[60px] flex justify-center items-center ransition-all duration-100 hover:scale-105`}
              >
                {link.platform}
              </a>
            ))
          ) : (
            <p className="text-gray-600">No social media links available.</p>
          )}
        </div>
        <PromoBanner />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
