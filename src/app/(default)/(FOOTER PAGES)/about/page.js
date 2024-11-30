import React from "react";
import Link from "next/link";
import { bri3 } from "@/app/fonts";

export default function AboutUs() {
  return (
    <div
      className={` mx-auto p-8 text-gray-100 bg-gradient-to-r from-pink-100/50 to-gray-100 shadow-lg ${bri3.className} `}
    >
      <h1 className="text-4xl font-bold mb-6 border-b border-gray-600 text-black pb-2">
        About Us
      </h1>
      <section className="mb-6">
        <p className="text-lg mb-4 text-black">
          Welcome to{" "}
          <span className="font-semibold text-pink-5">FlashLink</span>! This
          platform is the result of the dedication and creativity of Swabhiman
          Nanda, the sole creator and visionary behind this innovative project.
          FlashLink allows users to create, share, and manage flashcards with
          personalized and visually appealing designs. Our mission is to
          simplify social media management and connect users through interactive
          and stylish flashcards.
        </p>
        <p className="text-lg text-black">
          FlashLink empowers individuals and businesses by offering a creative
          way to showcase their social presence and connect with their audience.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Our Story</h2>
        <p className="text-lg mb-4 text-black">
          FlashLink was envisioned and developed solely by Swabhiman Nanda,
          whose passion for software development and user-centric design led to
          its creation. What started as a small project aimed at making social
          profile sharing easier has grown into a comprehensive tool that helps
          users seamlessly manage and share their online presence.
        </p>
        <p className="text-lg text-black">
          The journey has been fueled by a relentless commitment to innovation,
          attention to user feedback, and a desire to build a tool that truly
          serves the needs of its users.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li className="text-lg text-black">
            <span className="font-semibold text-pink-5">Innovation:</span>{" "}
            Always striving to create new, efficient solutions that enhance user
            experience.
          </li>
          <li className="text-lg text-black">
            <span className="font-semibold text-pink-5">Simplicity:</span>{" "}
            Designing a platform that is easy to use and accessible to everyone.
          </li>
          <li className="text-lg text-black">
            <span className="font-semibold text-pink-5">Excellence:</span>{" "}
            Upholding the highest standards in every aspect of development and
            design.
          </li>
        </ul>
      </section>
      <section className="mt-8 text-black">
        <h2 className="text-2xl font-semibold mb-4">Meet the Creator</h2>
        <p className="text-lg mb-4 ">
          Swabhiman Nanda, the sole developer and founder of FlashLink, brings a
          wealth of knowledge in full-stack development, with a focus on
          creating innovative web applications. His vision, coding expertise,
          and design sensibilities have been pivotal in making FlashLink a
          reality.
        </p>

        <p className="text-lg ">
          Swabhiman&#39;s dedication to the project is evident in every line of
          code and design choice, ensuring users have a seamless and visually
          appealing experience.
        </p>
      </section>
      <section className="mt-8 text-black">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-lg">
          Want to learn more about FlashLink or have any questions? Feel free to{" "}
          <Link href="/contact-us" className="text-pink-5 underline">
            contact us
          </Link>
          . Swabhiman Nanda is always open to feedback and is happy to engage
          with the user community.
        </p>
      </section>
    </div>
  );
}
