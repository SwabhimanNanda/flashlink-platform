import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-gray-200  z-[10000000]">
      <p className="text-xs text-black">
        © 2024 FlashLink. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-color underline-offset-2 text-black hover:text-gray-900"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-xs hover:underline underline-color underline-offset-2  text-black hover:text-gray-900"
          href="/disclaimer"
        >
          Disclaimer
        </Link>
        <Link
          className="text-xs hover:underline underline-color underline-offset-2 text-black hover:text-gray-900"
          href="/contact-us"
        >
          Contact Us
        </Link>
      </nav>
    </footer>
  );
}
