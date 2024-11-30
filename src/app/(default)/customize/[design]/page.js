"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { designs } from "@/app/Components/data/design";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MAX_LINKS = 5;
const INITIAL_LINK = Object.freeze({ platform: "", link: "" });
const CACHE_KEY = "flashlink_social_media_data";
const CACHE_DURATION = 60 * 60 * 1000; 

const getCachedData = () => {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
};

const setCachedData = (data) => {
  if (typeof window === "undefined") return;

  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

const validateSocialLink = (link) => {
  const { platform, link: url } = link;
  if (!platform?.trim()) return "Platform name is required";
  if (!url?.trim()) return "URL is required";

  try {
    new URL(url);
    return null;
  } catch {
    return "Invalid URL format";
  }
};

const AvatarSection = React.memo(
  ({ session, fetchingUsername, username, avatarBorder }) => (
    <>
      <Avatar className="w-24 h-24 mx-auto transition-all duration-300">
        <AvatarFallback className={`text-2xl border ${avatarBorder}`}>
          {fetchingUsername ? (
            <Loader2 className="animate-spin" />
          ) : (
            session?.user?.name?.[0]?.toUpperCase() || "?"
          )}
        </AvatarFallback>
      </Avatar>
      <p className="text-center mt-4 text-xl font-semibold">
        {username ? `@${username}` : "@username"}
      </p>
    </>
  )
);
AvatarSection.displayName = "AvatarSection";

const SocialLinkForm = React.memo(
  ({ link, index, onRemove, onChange, showRemoveButton }) => (
    <div className="space-y-4 bg-blue-300 p-4 rounded-lg">
      <div className="flex flex-col space-y-2">
        <Label htmlFor={`platform-${index}`} className="text-black">
          Social Media Name
        </Label>
        <Input
          id={`platform-${index}`}
          maxLength={15}
          className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Twitter, Instagram, LinkedIn"
          value={link.platform}
          onChange={(e) => onChange(index, e.target.value, "platform")}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor={`link-${index}`} className="text-black">
          Profile URL
        </Label>
        <Input
          id={`link-${index}`}
          className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
          placeholder="https://"
          value={link.link}
          onChange={(e) => onChange(index, e.target.value, "link")}
        />
      </div>
      {showRemoveButton && (
        <Button
          type="button"
          variant="destructive"
          className="w-full hover:bg-red-600 transition-colors"
          onClick={() => onRemove(index)}
        >
          Remove Link
        </Button>
      )}
    </div>
  )
);
SocialLinkForm.displayName = "SocialLinkForm";

export default function CustomizeCard() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUsername, setFetchingUsername] = useState(false);
  const [error, setError] = useState(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { ...INITIAL_LINK },
  ]);

  const params = useParams();
  const designData = useMemo(() => designs[params.design], [params.design]);

  const { gradient, borderColor, avatarBorder, textColor, linksStyle } =
    designData || {};

  useEffect(() => {
    const cachedLinks = getCachedData();
    if (cachedLinks?.length > 0) {
      setSocialMediaLinks(cachedLinks);
    }
  }, []);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchUsername = async () => {
      setFetchingUsername(true);
      try {
        const { data } = await axios.get("/api/user");
        if (data) setUsername(data);
      } catch (error) {
        console.error("Error fetching username:", error);
        toast.error("Failed to fetch username");
      } finally {
        setFetchingUsername(false);
      }
    };

    fetchUsername();
  }, [session?.user?.email]);

  const handleAddLink = useCallback(() => {
    setSocialMediaLinks((prev) => {
      if (prev.length >= MAX_LINKS) {
        toast.error(`Maximum ${MAX_LINKS} links allowed`);
        return prev;
      }
      const newLinks = [...prev, { ...INITIAL_LINK }];
      setCachedData(newLinks);
      return newLinks;
    });
  }, []);

  const handleRemoveLink = useCallback((index) => {
    setSocialMediaLinks((prev) => {
      if (prev.length <= 1) return prev;
      const newLinks = prev.filter((_, i) => i !== index);
      setCachedData(newLinks);
      return newLinks;
    });
  }, []);

  const handleSocialMediaLinkChange = useCallback((index, value, type) => {
    setSocialMediaLinks((prev) => {
      const newLinks = prev.map((link, i) =>
        i === index ? { ...link, [type]: value } : link
      );
      setCachedData(newLinks);
      return newLinks;
    });
  }, []);

  const resetForm = useCallback(() => {
    setSocialMediaLinks([{ ...INITIAL_LINK }]);
    localStorage.removeItem(CACHE_KEY);
  }, []);

  const handleSave = async () => {
    if (loading) return;
    setError(null);

    if (!session) {
      toast.error("⚠️ Please login first to continue", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
        },
      });
      return;
    }

    const errors = socialMediaLinks.map(validateSocialLink).filter(Boolean);
    if (errors.length) {
      toast.error(errors[0]);
      setError(errors[0]);
      return;
    }

    const dataToSave = {
      gradient,
      textColor,
      borderColor,
      avatarBorder,
      linksStyle,
      socialLinks: socialMediaLinks,
    };

    setLoading(true);
    try {
      const response = await axios.post("/api/flashcard", dataToSave);
      toast.success(response.data.message || "Card saved successfully!");
      resetForm();
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(
          "You already have a card. Please delete your existing card first."
        );
      } else {
        toast.error(error.response?.data?.message || "Failed to save card");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!designData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-100">Design not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100/50 to-gray-100 text-gray-100 p-6">
      <h1 className="text-4xl lg:text-7xl font-bold text-center text-black mb-8">
        Customize Your FlashLink Card
      </h1>

      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-col gap-8">
          <div className="flex justify-center items-start">
            <Card
              className={`w-[300px] md:w-[300px] md:max-w-[350px] lg:w-[390px] lg:max-w-[450px] min-h-[550px] max-h-fit p-6 ${gradient} border-2 ${borderColor} rounded-xl shadow-lg transition-all duration-300`}
            >
              <AvatarSection
                session={session}
                fetchingUsername={fetchingUsername}
                username={username}
                avatarBorder={avatarBorder}
              />
              <div className="mt-8 space-y-4">
                {socialMediaLinks.map(
                  (link, i) =>
                    link.platform && (
                      <div
                        key={i}
                        className={`${linksStyle} ${textColor} text-sm lg:text-xl text-center transition-all duration-300 hover:scale-105`}
                      >
                        {link.platform}
                      </div>
                    )
                )}
                {!socialMediaLinks.some((link) => link.platform) && (
                  <div className="text-center text-xl text-black/42 mt-4">
                    Add your social media links using the form
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="bg-blue-200 p-3 lg:p-6 rounded-xl shadow-xl w-full max-w-[400px]">
            <div className="space-y-6">
              {socialMediaLinks.map((link, index) => (
                <SocialLinkForm
                  key={index}
                  link={link}
                  index={index}
                  onRemove={handleRemoveLink}
                  onChange={handleSocialMediaLinkChange}
                  showRemoveButton={socialMediaLinks.length > 1}
                />
              ))}

              <div className="space-y-4">
                {socialMediaLinks.length < MAX_LINKS && (
                  <Button
                    type="button"
                    className="w-full bg-green-500 hover:bg-green-600 transition-colors"
                    onClick={handleAddLink}
                  >
                    Add More
                  </Button>
                )}

                <Button
                  type="button"
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-50"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Card"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
