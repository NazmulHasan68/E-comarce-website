import { MoveRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdsCarousel({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);

  if (!data.length) return null;

  const { title, description, linkText, linkUrl, imageUrl, id } = data[currentIndex];

  return (
    <div
      key={id}
      className="relative md:h-[180px] h-[150px] max-w-7xl mx-auto rounded-lg overflow-hidden my-4 shadow-lg"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 text-white">
        <h1 className="text-md md:text-base font-bold drop-shadow-lg">{title}</h1>
        <p className="text-xs md:text-sm max-w-lg drop-shadow-md w-[80%] line-clamp-2">{description}</p>
        <Link
          to={linkUrl}
          className="flex items-center gap-1 hover:text-orange-500 scale-105 rounded-full text-sm font-medium hover:brightness-110 transition"
        >
          {linkText}
          <MoveRight className="mt-1" />
        </Link>
      </div>
    </div>
  );
}
