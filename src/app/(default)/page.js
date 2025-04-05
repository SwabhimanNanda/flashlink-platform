"use client";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { inter, bri, bri2, bri3 } from "@/app/fonts";
import { useState } from "react";
import toast from "react-hot-toast";
import pic1 from "../../../public/pic1.webp";
import people from "../../../public/people.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, Card } from "@/components/ui/card";
import {
  BookOpen,
  Share2,
  Link as LinkIcon,
  Menu,
  X,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Twitch,
} from "lucide-react";
import SocialMediaStrip from "../Components/SocialMediaStrip";
import ImageCarousel from "../Components/ImageCarousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chatbot from "../Components/chatbot";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    toast.dismiss();

    try {
      const response = await axios.post("/api/subscribe", { email });

      setLoading(false);

      if (response.status === 201) {
        setEmail("");
        toast.success("Thank you for subscribing!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      setLoading(false);

      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <>
    {/* <Chatbot/> */}
    <div className="flex flex-col min-h-svh bg-gradient-to-r from-pink-100/50 to-gray-100 text-gray-100">
      <main className="flex-1">
        <section className=" lg:h-dvh  w-full flex justify-center lg:px-[200px] py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-pink-200 to-gray-100 text-gray-100">
          <div className="container flex justify-center lg:gap-[150px] max-lg:flex-col items-center  px-4 md:px-6">
            <div className="flex flex-col justify-center gap-7">
              <div className="flex flex-col max-lg:gap-3 max-md:mt-[10px]">
                <h1
                  className={`lg:mb-[40px] text-4xl text-black font-bold  sm:text-3xl md:text-4xl lg:text-7xl  tracking-tight ${bri.className}`}
                  >
                  Your Social Links, <br /> One Flash Card
                  <span className="text-pink-5">.</span>
                </h1>
                <p
                  className={`max-w-[500px] leading-[20px] text-gray-500 text-[15px] md:text-xl lg:text-xl ${inter.className}`}
                  >
                  Create, share, and connect. FlashLink brings all your social
                  profiles together in one sleek, shareable card.
                </p>
              </div>
              <Link className="" href={"/create-card"}>
                <Button className="bg-pink-5 text-white hover:text-pink-5  z-[10000] border hover:bg-white  border-pink-5  transition-colors text-base lg:text-xl mt-2 lg:mt-4 px-7 lg:px-12 py-6 lg:py-7 ">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="animate-[gentleWiggle_8s_ease-in-out_infinite] flex justify-center max-md:mt-6 max-lg:mt-[50px]">
              <Image
                src={pic1}
                alt="img1"
                className="max-lg:w-[90%] max-lg:h-auto lg:w-[400px] rounded-tl-[50px]"
                />
            </div>
          </div>
        </section>
        <section>
          <div className="h-fit py-[40px] flex flex-col lg:flex-row-reverse items-center justify-evenly  lg:px-[60px]  lg:gap-[150px] bg-gray-50">
            <h1
              className={`text-gray-500 text-[18px] text-wrap text-center ${inter.className}`}
              >
              Your social media, your way. Add your profiles and let the world
              connect with you.
            </h1>
            <SocialMediaStrip />
          </div>
        </section>
        <section className="p-9 py-[50px] lg:py-[80px] px-[30px] md:px-[50px] lg:px-[20px] xl:px-[200px] 2xl:px-[220px] bg-purple-300/20">
          <div className="w-full  h-fit py-[20px] lg:py-[40px] px-[10px] lg:px-[50px] sm:xl md:2xl lg:4xl xl:text-5xl text-black bg-blue-200/40 rounded-[40px] relative">
            <p
              className={`lg:leading-[62px] max-md:px-4 word-spacing-custom ${bri2.className} `}
              >
              <span className={`${bri3.className}`}>
                FlashLink makes it easy to showcase your
                <span className={`${bri2.className}`}> social profiles</span>,
                simplify sharing, and create standout flashcards.
              </span>
              <span className="-rotate-180">✨</span>
              <span className={`${bri3.className}`}>
                Get started now — it’s free!
              </span>
              <span className="-rotate-180">✅</span> No setup hassles
              <span className="-rotate-180">🚀</span> Easy-to-use interface No
              credit card required
            </p>
            <span className="-rotate-12 absolute top-0 max-lg:right-0 -right-[60px] w-[170px] max-lg:w-[20%] max-lg:h-auto">
              <Image src={people} alt="people"></Image>
            </span>
          </div>
        </section>
        <section className="w-full pt-[40px] lg:pt-[150px] py-12 md:py-24 lg:py-32 bg-blue-200/40">
          <div className="container mx-auto px-4">
            {/* Title */}
            <h2
              className={`${bri2.className} text-3xl tracking-normal sm:text-4xl md:text-8xl text-center lg:mb-[90px] text-black`}
              >
              Your Digital Identity Card
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Carousel Section */}
              <div className="w-full lg:w-1/2">
                <ImageCarousel />
              </div>

              <div className="w-full lg:w-1/2">
                <div className="flex flex-col gap-7 text-gray-800">
              
                  <h3
                    className={` ${bri2.className} max-md:text-2xl  max-lg:text4xl  text-5xl font-bold `}
                  >
                    Why Choose FlashLink<span className="text-pink-5">?</span>
                  </h3>

                  <ul
                    className={`${bri3.className} flex flex-col gap-4 text-gray-300 `}
                  >
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-7 w-7 text-pink-5" />
                      <span className="text-xl text-gray-500">
                        Sleek, professional design
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-7 w-7 text-pink-5" />
                      <span className="text-xl text-gray-500">
                        Customizable layout and colors
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-7 w-7 text-pink-5" />
                      <span className="text-xl text-gray-500">
                        Easy to share and update
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-7 w-7 text-pink-5" />
                      <span className="text-xl text-gray-500">
                        Analytics to track views and clicks
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-7 w-7 text-pink-5" />
                      <span className="text-xl text-gray-500">
                        Integrates with all major social platforms
                      </span>
                    </li>
                  </ul>

                  <Link href={"/create-card"}>
                    <Button className="border border-pink-5 bg-pink-5 transition-colors hover:bg-white hover:text-pink-5   mt-4 max-lg:w-full py-6 px-9 w-fit text-xl">
                      Create Your Card Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 flex justify-center md:py-24 lg:py-32 bg-gray-200/50 ">
          <div className="container px-4 md:px-6">
            <h2
              className={`text-5xl font-bold tracking-tighter sm:text-4xl md:text-7xl text-center mb-12 text-black ${bri2.className} `}
            >
              How It Works <span className="text-pink-5">?</span>
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-blue-600/40 py-5 lg:py-7  relative overflow-hidden ">
                <CardContent className="flex flex-col items-center  lg:gap-2 p-6">
                  <div className="p-2 bg-blue-500 rounded-full flex justify-center items-center">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl mt-3 lg:mt-4 font-bold text-black">
                    Create Your Card
                  </h3>
                  <p className="text-center text-blue-700">
                    Design your custom flash card with your photo, bio, and
                    social media links.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-600/40  py-5 lg:py-7 relative overflow-hidden ">
                <CardContent className="flex flex-col items-center  lg:gap-2 p-6">
                  <div className="p-2 bg-green-500 rounded-full flex justify-center items-center ">
                    <Share2 className="h-12 w-12 text-white " />
                  </div>
                  <h3 className="text-xl mt-3 lg:mt-4 font-bold text-black">
                    Share Your Card
                  </h3>
                  <p className="text-center text-green-700">
                    Get a unique link to your flash card and share it across
                    platforms.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-purple-600/40 py-5 lg:py-7 relative overflow-hidden">
                <CardContent className="flex flex-col items-center  lg:gap-2 p-6">
                  <div className="p-2 bg-purple-500 rounded-full flex justify-center items-center">
                    <LinkIcon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl mt-3 lg:mt-4 font-bold text-black">
                    Connect Instantly
                  </h3>
                  <p className="text-center text-purple-800">
                    Friends and colleagues can access all your social profiles
                    from one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 flex justify-center md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-3  text-center">
              <div className="flex flex-col">
                <h2
                  className={` ${bri2.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-7xl text-black `}
                >
                  Ready to Create Your Social Flash Card?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl mt-8 mb-6">
                  Join thousands of users who are simplifying their social media
                  sharing with our flashlink app.
                </p>
              </div>
              <div className="w-full max-w-sm flex flex-col gap-2">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <Input
                    className="max-w-lg flex-1 bg-pink-100/50 border-pink-700 border-pink-5 text-pink-5 placeholder-pink-400 placeholder:text-pink-5 placeholder:text-lg h-[40px]"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-pink-5 hover:text-pink-5 transition-colors hover:bg-white border border-pink-5 py-5 "
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </Button>
                </form>
                {/* <form onSubmit={handleSubmit} className="sign-up-form">
      <label htmlFor="email">Enter your email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Your email address"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form> */}
                <p className="text-xs mt-2  text-gray-500/60">
                  ⓘ By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 flex justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
          <div className="container px-4 md:px-6">
            <h2
              className={` text-3xl font-bold tracking-tighter sm:text-4xl md:text-7xl text-center mb-12 text-black ${bri2.className}`}
            >
              Frequently Asked Questions
            </h2>
            <Tabs defaultValue="general" className="w-full max-w-3xl mx-auto">
              <TabsList className="flex justify-between bg-gray-200 h-[40px] lg:h-[70px]">
                <TabsTrigger value="general" className="w-full h-full text-xl ">
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="technical"
                  className="w-full h-full text-xl"
                >
                  Technical
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="flex flex-col gap-7">
                  <div className="mt-7">
                    <h3 className="text-2xl font-semibold text-slate-600">
                      What is FlashLink?
                    </h3>
                    <p className="text-pink-700 mt-2">
                      FlashLink is a platform that allows you to create a
                      digital business card containing all your social media
                      links in one place.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-600 ">
                      Is it free to use?
                    </h3>
                    <p className="text-pink-700 mt-2">
                      We offer a free tier with features.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="technical">
                <div className="flex flex-col  gap-7">
                  <div className="mt-7">
                    <h3 className="text-2xl font-semibold text-slate-600">
                      Can I customize my FlashLink card?
                    </h3>
                    <p className="text-pink-700 mt-2">
                      Yes, you can customize the design, layout, and content of
                      your FlashLink card to match your personal brand.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-600">
                      Is my data secure?
                    </h3>
                    <p className="text-pink-700 mt-2">
                      We take data security seriously. All your information is
                      encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
