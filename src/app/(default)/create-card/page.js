"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { designs } from "@/app/Components/data/design";
import { useRouter } from "next/navigation";
import { bri2, bri3 } from "@/app/fonts";

const CardsGallery = () => {
  const router = useRouter();

  const handleCardSelect = (design) => {
    router.push(`/customize/${design}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100/50 to-gray-100 text-gray-100">
      <h1
        className={` text-5xl lg:text-6xl font-bold text-center text-black pt-7 mb-6 ${bri2.className} `}
      >
        Choose Your FlashLink Card Design
      </h1>
      <p
        className={` ${bri3.className} text-xl text-center mb-12 text-gray-400 `}
      >
        Choose from our stunning collection of card designs to create your
        perfect digital identity
      </p>
      <div className="bg-yellow-100 text-black font-bold p-4 rounded-lg shadow-lg text-center mb-6">
        <p className={` lg:text-lg ${bri3.className} `}>
          🚨 More designs coming soon! Stay tuned for more exciting updates. 🚨
        </p>
      </div>

      <div className="container mx-auto max-lg:px-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(designs).map(([designKey, designData]) => (
            <div
              key={designKey}
              className="transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleCardSelect(designKey)}
            >
              <Card
                className={`w-full h-[400px] p-4 ${designData.gradient} ${designData.borderColor} shadow-lg rounded-xl`}
              >
                <Avatar
                  className={`mx-auto border ${designData.avatarBorder} h-[40px] w-[40px] `}
                >
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <p className={`text-center mt-2 ${designData.textColor}`}>
                  @username
                </p>
                <div className="mt-4 space-y-3">
                  <div
                    className={`text-center ${designData.linksStyle}, ${designData.textColor}`}
                  >
                    Twitter
                  </div>
                  <div
                    className={`text-center ${designData.linksStyle}, ${designData.textColor}`}
                  >
                    Instagram
                  </div>
                  <div
                    className={`text-center ${designData.linksStyle}, ${designData.textColor}`}
                  >
                    Facebook
                  </div>
                  <div
                    className={`text-center ${designData.linksStyle}, ${designData.textColor}`}
                  >
                    LinkedIn
                  </div>
                  <div
                    className={`text-center ${designData.linksStyle}, ${designData.textColor}`}
                  >
                    Facebook
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsGallery;
