import React from "react";
import { inter, bri, bri2, bri3 } from "@/app/fonts";

export default function Page() {
  return (
    <div
      className={` mx-auto p-6 pb-5 h-fit bg-gradient-to-r from-pink-100/50 to-gray-100 ${bri3.className} `}
    >
      <h1 className="text-center text-4xl lg:text-7xl font-bold mb-9 pb-2 text-black ">
        Privacy Policy
      </h1>
      <p className="mt-4 text-lg text-pink-5 text-center">
        Welcome to FlashLink. We are committed to protecting your personal
        information and your right to privacy. This Privacy Policy explains what
        information we collect, how we use it, and your rights concerning your
        data.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        1. Information We Collect
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        We collect information that you provide to us directly, such as your
        name, email address, and any content you choose to create or share on
        FlashLink. Additionally, we may collect certain usage data
        automatically, including your IP address and browser details.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        2. How We Use Your Information
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        The information we collect is used to operate, maintain, and improve our
        platform. We may use your data to personalize your experience, respond
        to inquiries, and communicate updates related to our services.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        3. Data Sharing and Disclosure
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        We do not share your personal data with third parties except when
        necessary to provide our services, comply with legal obligations, or
        protect the rights and safety of our users.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        4. Cookies and Tracking Technologies
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        FlashLink may use cookies to enhance user experience and gather usage
        data. You can control the use of cookies through your browser settings,
        but this may impact some functionalities of our site.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        5. Data Security
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        We take appropriate security measures to protect your data from
        unauthorized access or disclosure. However, no method of transmission
        over the Internet or electronic storage is 100% secure.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">6. Your Rights</h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        You have the right to access, update, or delete your personal
        information. If you wish to exercise these rights, please contact us at{" "}
        <a
          href="mailto:support@flashlink.com"
          className="text-pink-5 underline"
        >
          support@flashlink.com
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold text-pink-5">
        7. Changes to This Policy
      </h2>
      <p className="mt-3 mb-[40px] tracking-wide text-black text-lg">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and the date of the last update will be indicated
        at the top of this document.
      </p>
      <p className="mt-6">
        If you have any questions or concerns about our Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:support@flashlink.com"
          className="text-pink-5 underline"
        >
          support@flashlink.com
        </a>
        .
      </p>
    </div>
  );
}
