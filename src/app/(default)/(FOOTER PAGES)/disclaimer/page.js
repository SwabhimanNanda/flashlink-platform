import React from "react";
import { inter, bri, bri2, bri3 } from "@/app/fonts";

const Page = () => {
  return (
    <div
      className={` ${bri3.className} mx-auto p-6 h-fit pb-5 bg-gradient-to-r from-pink-100/50 to-gray-100 `}
    >
      <h1 className="text-4xl lg:text-7xl font-bold text-center text-black mb-9">
        Disclaimer
      </h1>
      <p className="mt-4 text-lg text-pink-5 text-center">
        Welcome to FlashLink. By using this platform, you agree to the terms and
        conditions outlined in this disclaimer. Please read it carefully.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        1. General Information
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg ">
        FlashLink is a user-friendly web application that allows users to create
        and share personalized flashcards containing social media URLs. While we
        strive to ensure the accuracy and reliability of our services, the
        content shared through FlashLink is user-generated and not monitored or
        verified by the platform.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        2. No Guarantees
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg ">
        FlashLink does not guarantee the availability, functionality, or
        security of the platform at all times. We do not make representations or
        warranties of any kind, express or implied, about the completeness,
        accuracy, or reliability of the content users share.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        3. User Responsibility
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg ">
        Users are solely responsible for the content they upload, share, or link
        to using FlashLink. We encourage users to ensure that any shared content
        complies with relevant laws and does not infringe on the rights of third
        parties. FlashLink disclaims any liability for user-generated content
        that may violate privacy, copyright, or other legal standards.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        4. Third-Party Links
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg ">
        FlashLink may contain links to third-party websites. These links are
        provided for convenience and informational purposes only. We have no
        control over the nature, content, and availability of those sites and
        accept no liability for any issues arising from the use of third-party
        links.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        5. Intellectual Property Rights
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg ">
        FlashLink and its associated logo, design, and features are the
        exclusive property of the platform’s creators. Unauthorized use,
        reproduction, or redistribution of any part of FlashLink without prior
        written permission is strictly prohibited. All user-generated flashcards
        remain the intellectual property of their respective creators but may be
        shared or viewed as intended by the platform’s functionality.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        6. Privacy and Data
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg ">
        Your privacy is important to us. Please refer to our Privacy Policy for
        information on how we collect, use, and protect your data.
      </p>
    </div>
  );
};

export default Page;
