"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import toast from "react-hot-toast";

const ClipboardCopy = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    console.log("hy");

    try {
      const baseUrl = "https://flashlink-nine.vercel.app";
      const fullUrl = `${baseUrl}/${url}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);

      toast.success("Profile link copied!", {
        position: "bottom-center",
        style: {
          background: "#4F46E5",
          color: "#fff",
          padding: "16px",
        },
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("Failed to copy link", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleCopy}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-[10000000000]"
        aria-label={copied ? "Copied to clipboard" : "Copy profile link"}
      >
        {copied ? (
          <Check size={17} className="text-green-500" />
        ) : (
          <Clipboard size={17} className="text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default ClipboardCopy;
