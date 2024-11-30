import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  Discord,
  Twitch,
  DribbbleIcon,
} from "lucide-react";

const SocialMediaStrip = () => {
  const socialIcons = [
    { icon: Instagram, color: "#E4405F", name: "Instagram" },
    { icon: Facebook, color: "#1877F2", name: "Facebook" },
    { icon: Twitter, color: "#1DA1F2", name: "Twitter" },
    { icon: Linkedin, color: "#0A66C2", name: "LinkedIn" },
    { icon: Youtube, color: "#FF0000", name: "YouTube" },
    { icon: Github, color: "#181717", name: "GitHub" },
    { icon: Twitch, color: "#9146FF", name: "Twitch" },
    { icon: DribbbleIcon, color: "#EA4C89", name: "Dribbble" },
  ];

  // Double the array to create seamless loop
  const duplicatedIcons = [...socialIcons, ...socialIcons];

  return (
    <div className="w-full lg:w-1/2 overflow-hidden bg-gray-50 py-8">
      <div className="relative flex">
        <div className="animate-scroll flex space-x-12 whitespace-nowrap">
          {duplicatedIcons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-2 transition-transform duration-300 hover:scale-110"
              >
                <Icon size={24} color={item.color} />
                <span className="text-sm font-medium text-gray-600">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaStrip;
