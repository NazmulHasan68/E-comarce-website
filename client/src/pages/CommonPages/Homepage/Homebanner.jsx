import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    image: "https://email.uplers.com/blog/wp-content/uploads/2024/11/Gif-banner_1.gif",
    caption: "Discover Our New Collection",
  },
  {
    id: 2,
    image: "https://email.uplers.com/blog/wp-content/uploads/2023/03/Banner-Ad-Examples-to-Get-You-Inspired.png",
    caption: "Step Up Your Style",
  },
  {
    id: 3,
    image: "https://email.uplers.com/blog/wp-content/uploads/2023/04/Tips-Responsive-banner-ad-1024x411.png",
    caption: "Accessorize Your Life",
  },
  
];

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-white/50 hover:bg-white rounded-full"
  >
    <ChevronLeft size={24} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 bg-white/50 hover:bg-white rounded-full"
  >
    <ChevronRight size={24} />
  </button>
);

export default function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, 
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow className="p-1"/>,
    nextArrow: <NextArrow className="p-1"/>,
    appendDots: dots => (
      <div className="absolute bottom-2 w-full flex justify-center">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 rounded-full bg-white/70 hover:bg-white"></div>
    )
  };

  return (
    <div className="relative max-w-6xl mx-auto md:mt-3 h-[25vh] md:h-[40vh] overflow-hidden rounded-sm md:rounded-xl ">
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-[25vh] md:h-[40vh] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-xl md:text-3xl font-bold text-center px-4">
                {slide.caption}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
