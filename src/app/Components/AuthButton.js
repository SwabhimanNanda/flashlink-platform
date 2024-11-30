import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  if (session) {
    return (
      <>
        <div className="flex justify-evenly space-x-4 ml-6">
          <button
            onClick={handleSignOut}
            className="text-sm px-4 py-2 rounded-xl border border-pink-5 text-white bg-pink-5 hover:bg-white hover:text-pink-5"
          >
            Sign Out
          </button>
          {session.user?.image && (
            <button onClick={() => setIsOpen(true)} className="relative group">
              <Image
                src={session.user.image}
                alt="Profile"
                width={44}
                height={44}
                className="rounded-full transition-transform transform group-hover:scale-105"
              />
              <div className="absolute -top-1 right-0 w-3 h-3 bg-pink-5 rounded-full" />
            </button>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">
                Get Your Unique Username Now! 🌟
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUsernameSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter your cool username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  pattern="^[a-zA-Z0-9_]{3,15}$"
                  title="Username must be 3-15 characters long and can only contain letters, numbers, and underscores"
                  required
                />
                <p className="text-sm text-gray-500">
                  3-15 characters, letters, numbers, and underscores only
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-5 border border-pink-5 text-white py-2 rounded-lg hover:bg-white hover:text-pink-5 transition-colors "
                disabled={isLoading}
              >
                {isLoading
                  ? "Checking availability..."
                  : "Claim Your Username!"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-pink-5 text-white px-4 py-2 rounded-xl hover:bg-white border border-pink-5 hover:text-pink-5 transition-colors ml-6 flex items-center gap-2"
    >
      Sign Up
    </button>
  );
};

export default AuthButtons;
