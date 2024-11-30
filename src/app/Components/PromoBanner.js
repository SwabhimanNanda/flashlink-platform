import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto animate-bounce max-lg:-bottom-3   w-fit">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-[0.5rem] rounded-lg shadow-md">
        <div className="bg-white w-[250px] lg:w-[300px] h-[130px] lg:h-[150px] rounded-md p-3 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-base">
              Join FlashLink Today!
            </h3>
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>

          <p className="text-xs text-gray-600 text-center  lg:max-w-[180px]">
            Get your unique username and share all your social links in one
            place.
          </p>

          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-transform duration-300 transform hover:scale-105 flex items-center gap-2 px-10 py-1.5 text-sm">
            <Link href="https://flashlink-nine.vercel.app/">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
