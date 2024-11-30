"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import AuthButtons from "./AuthButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { inter, bri, bri2, bri3 } from "@/app/fonts";
import img2 from "../../../public/img1.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Create Card", path: "/create-card" },
    { name: "My Cards", path: "/my-cards" },
    { name: "About", path: "/about" },
  ];
  const NavLink = ({ href, children, onClick }) => (
    <Link
      href={href}
      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors md:hover:bg-transparent md:p-0"
      onClick={onClick}
    >
      {children}
    </Link>
  );
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update username");
      }

      toast.success("🎉 Awesome! Your unique username is now yours!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
      setIsOpen(false);
    } catch (error) {
      toast.error(
        error.message === "Username already taken"
          ? "😅 Oops! This username is already taken. Try another one!"
          : "😟 Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white z-[10]">
      <div className="mx-auto px-4  sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-[65px] lg:h-[90px]">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center  outline-none border-none"
            >
              <Image
                src={img2}
                className="h-[40px] lg:h-[60px] w-[40px] lg:w-[60px]"
                alt="logo"
              ></Image>
              <span
                className={` font-semibold text-xl lg:text-4xl text-pink-5  ${bri2.className}`}
              >
                FlashLink
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <NavLink key={item.name} href={item.path}>
                  <div
                    className={`relative text-lg group ${
                      pathname === item.path ? "text-pink-5" : "text-gray-800"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-pink-5 transition-all duration-300 ${
                        pathname === item.path ? "w-full" : "w-0"
                      } group-hover:w-full`}
                    ></span>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="ml-4">
              <AuthButtons />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {session?.user?.image && (
              <button
                onClick={() => setIsOpen(true)}
                className="relative group"
              >
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={33}
                  height={33}
                  className="rounded-full"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full" />
              </button>
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="max-sm:w-[270px] rounded-xl   w-[350px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center ">
                    Get Your Unique Username Now! 🌟
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUsernameSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Enter your username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      pattern="^[a-zA-Z0-9_]{3,15}$"
                      title="Username must be 3-15 characters long and can only contain letters, numbers, and underscores"
                      required
                    />
                    <p className="text-sm text-pink-5">
                      3-15 characters, letters, numbers, and underscores only
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-pink-5 border border-pink-5 text-white hover:bg-white hover:text-pink-5 transition-colors  "
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Checking availability..."
                      : "Claim Your Username!"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-7 w-7 lg:h-12 lg:w-12  text-pink-5" />
              ) : (
                <Menu className="h-7 w-7 lg:h-12 lg:w-12 text-pink-5 " />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          fixed left-0 right-0 top-16 bg-white shadow-lg md:hidden pb-3
          transform transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "translate-y-0 opacity-100 visible"
              : "top-0 opacity-0 invisible"
          }
        `}
      >
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.path} onClick={closeMenu}>
              {item.name}
            </NavLink>
          ))}
          {!session ? (
            <button
              onClick={handleSignIn}
              className=" text-black px-4 py-2 rounded"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-black text-sm px-4 py-2 rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
