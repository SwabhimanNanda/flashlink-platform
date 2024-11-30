"use client";
import React, { useState } from "react";
import { inter, bri, bri2, bri3 } from "@/app/fonts";
import toast from "react-hot-toast";
import axios from "axios";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/contact",
        {
          name,
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error during contact form submission:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.details ||
        "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={` ${bri.className} mx-auto p-8 bg-gradient-to-r from-pink-100/50 to-gray-100 text-gray-100 h-fit py-[100px] shadow-lg flex flex-col item-center justify-center ${bri3.className} `}
    >
      <h1 className="text-4xl lg:text-7xl font-bold mb-6 border-b border-pink-5 text-black pb-2">
        Contact Us
      </h1>
      <p className="mb-6 text-black">
        We’d love to hear from you! Whether you have questions, feedback, or
        need assistance, please fill out the form below or reach us through the
        provided contact details.
      </p>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 rounded-md bg-pink-300/70 border border-pink-5 text-pink-5 placeholder:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-700"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-md border bg-pink-300/70 border-pink-5 text-pink-5 placeholder:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-700"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            className="w-full p-2 rounded-md bg-pink-300/70 border border-pink-5 text-pink-5 placeholder:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-700"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full p-2 bg-pink-5 border border-pink-5 hover:bg-white hover:text-pink-5 font-semibold rounded-md transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
      <div className="mt-8 text-black">
        <h2 className="text-xl font-semibold mb-2">Other Ways to Reach Us</h2>
        <p className="mb-2">
          Email:{" "}
          <a
            href="mailto:support@flashlink.com"
            className="text-pink-5 underline"
          >
            support@flashlink.com
          </a>
        </p>
      </div>
    </div>
  );
}
