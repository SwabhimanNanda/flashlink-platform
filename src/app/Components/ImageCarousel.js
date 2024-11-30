"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img1 from "../../../public/ImageCarousel/s1.png";
import img2 from "../../../public/ImageCarousel/s2.png";
import img3 from "../../../public/ImageCarousel/s3.png";
import img4 from "../../../public/ImageCarousel/s4.png";
import img5 from "../../../public/ImageCarousel/s5.png";

const ImageCarousel = () => {
  const images = [
    { id: 1, src: img1, alt: "Slide 1" },
    { id: 2, src: img2, alt: "Slide 2" },
    { id: 3, src: img3, alt: "Slide 3" },
    { id: 4, src: img4, alt: "Slide 4" },
    { id: 5, src: img5, alt: "Slide 5" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) =>
        current === images.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative max-w-[600px] mx-auto h-[400px] p-10 lg:h-[800px] ">
      {/* Image container */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute w-full h-full overflow-hidden transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="rounded-6xl object-contain "
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex
                ? "bg-pink-500 w-4"
                : "bg-pink-500/50 hover:bg-pink-900/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
