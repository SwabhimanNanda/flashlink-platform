"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Edit,
  Plus,
  Trash,
  LogIn,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Clipboard } from "lucide-react";
import { inter, bri, bri2, bri3 } from "@/app/fonts";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [flashCardData, setFlashCardData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    socialLinks: [],
    cardsDetails: [],
  });

  useEffect(() => {
    const fetchFlashCardData = async () => {
      if (session) {
        try {
          const { data } = await axios.get("/api/flashcard");
          setFlashCardData(data[0]);
          setEditFormData({
            socialLinks: data[0]?.socialLinks || [],
            cardsDetails: data[0]?.cardsDetails || [],
          });
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        } finally {
          // setLoading(false);
        }
      } else {
        // setLoading(false);
      }
    };

    fetchFlashCardData();
  }, [session]);

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleAddLink = () => {
    setEditFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", link: "" }],
    }));
  };

  const handleRemoveLink = (index) => {
    setEditFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleLinkChange = (index, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data: updatedData } = await axios.put("/api/flashcard", {
        userId: flashCardData.userId,
        socialLinks: editFormData.socialLinks,
        cardsDetails: flashCardData.cardsDetails,
      });

      setFlashCardData(updatedData);
      setIsEditing(false);
      toast.success("Successfully updated!");
    } catch (err) {
      toast.error(
        "Failed to update: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleDelete = async () => {
    const confirmDelete = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col items-center">
            <p className="mb-4">
              Are you sure you want to delete this flashcard?
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
              >
                Yes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
              >
                No
              </Button>
            </div>
          </div>
        ),
        {
          duration: 5000,
          position: "top-center",
        }
      );
    });

    if (!confirmDelete) return;

    try {
      await axios.delete("/api/flashcard", {
        data: { userId: flashCardData.userId },
      });

      toast.success("Successfully deleted!");
      setFlashCardData(null);
    } catch (err) {
      toast.error(
        "Failed to delete: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleCopyUrl = async () => {
    const baseUrl = "https://flashlink-nine.vercel.app";
    if (!flashCardData || !flashCardData.username) {
      toast.error("Username not available.");
      return;
    }

    const flashCardUrl = `${baseUrl}/${flashCardData.username}`;

    try {
      await navigator.clipboard.writeText(flashCardUrl);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy URL.");
    }
  };

  if (!session) {
    return (
      <div className="px-5 lg:px-0 h-svh lg:min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-pink-100/50 to-gray-100">
        <Card className="p-8 max-w-md w-full space-y-6 bg-gradient-to-r from-blue-200 ">
          <div className="text-center space-y-4">
            <LogIn className="w-12 h-12 mx-auto text-blue-500" />
            <h1 className="text-2xl font-bold">Welcome to FlashLink!</h1>
            <p>Sign in to view and manage your flashcards</p>
          </div>
          <button
            onClick={handleSignIn}
            className="outline-none border-none flex justify-center items-center mx-auto shadow-lg"
          >
            <div className="flex justify-center items-center gap-3 border bottom-1 border-blue-100 px-5 rounded-md py-2 shadow-md">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.98em"
                  height="1em"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
              </div>
              <div>Continue with Google</div>
            </div>
          </button>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-pink-100/50 to-gray-100 text-gray-100">
        <Card className="p-8 max-w-md w-full">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
            <h1 className="text-xl font-semibold text-gray-900">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!flashCardData) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-pink-100/50 to-gray-100 ">
        <Card className="p-8 max-w-md w-full border-none bg-gradient-to-r from-blue-200">
          <div className="text-center space-y-6 ">
            <CreditCard className="w-12 h-12 mx-auto text-blue-500" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-black">
                No FlashLink Yet
              </h1>
              <p className="text-black">
                Create your first FlashLink to get started!
              </p>
            </div>
            <Button
              onClick={() => router.push("/create-card")}
              className="w-full bg-gradient-to-r from-blue-200 to-white text-black shadow-md hover:bg-cyan"
            >
              Create Your First Card
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const cardStyle = flashCardData.cardsDetails[0] || {
    gradient: "bg-gradient-to-br from-teal-200 to-blue-300",
    textColor: "text-gray-800",
    borderColor: "border-blue-400",
    avatarBorder: "border-blue-400",
    linksStyle: "bg-white/90 rounded-lg shadow-md",
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-pink-100/50 to-gray-100 text-gray-100 p-3">
      <h1
        className={` ${bri2.className} text-4xl lg:text-7xl font-bold mb-8 mt-4 text-black `}
      >
        Your Profile
      </h1>
      <div
        className={`relative w-full h-[550px] lg:h-[600px] lg:min-h-fit lg:w-[500px] p-3 lg:p-6 m-[20px] border rounded-md ${cardStyle.borderColor} ${cardStyle.gradient}`}
      >
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <div onClick={handleCopyUrl} className="cursor-pointer">
            <Clipboard size={17} color="black" />
          </div>
          <div
            onClick={() => setIsEditing(!isEditing)}
            className="cursor-pointer"
          >
            <Edit size={17} color="black" />
          </div>
          <div onClick={handleDelete} className="cursor-pointer">
            <Trash size={17} color="black" />
          </div>
        </div>

        {!isEditing ? (
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div
              className={`flex justify-center border h-24 max-md:mt-6 w-24 rounded-full text-black ${cardStyle.avatarBorder}`}
            >
              <div className="flex justify-center items-center h-full w-full rounded-full bg-white text-2xl">
                {session.user.name?.slice(0, 1).toUpperCase()}
              </div>
            </div>

            <p className={`text-lg font-medium mt-4 ${cardStyle.textColor}`}>
              @{flashCardData.username || session.user.username}
            </p>

            <div className="mt-8 w-full max-w-lg flex flex-col gap-5 lg:gap-7">
              {flashCardData.socialLinks &&
              flashCardData.socialLinks.length > 0 ? (
                flashCardData.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardStyle.linksStyle} ${cardStyle.textColor} block w-full py-2 lg:py-4 font-semibold text-center transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
                  >
                    {link.platform}
                  </a>
                ))
              ) : (
                <div className="text-center space-y-2">
                  <p className={`${cardStyle.textColor}`}>
                    No social media links available.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="mx-auto"
                  >
                    Add Your First Link
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col items-center text-black">
            <h3 className="text-lg font-semibold mb-4 mt-6">
              Edit Social Links
            </h3>
            <div className="w-full space-y-4">
              {editFormData.socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Platform"
                    value={link.platform}
                    onChange={(e) =>
                      handleLinkChange(index, "platform", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="URL"
                    value={link.link}
                    onChange={(e) =>
                      handleLinkChange(index, "link", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddLink}
                className="w-full text-black"
              >
                <Plus className="h-4 w-4 text-black" /> Add Link
              </Button>
              <Button onClick={handleSubmit} className="w-full">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
