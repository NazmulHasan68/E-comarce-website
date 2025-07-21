import React from "react";
import {
  Shirt,
  Watch,
  ShoppingBag,
  Scissors,
  Briefcase,
  Glasses,
  Package,
  ShoppingCart,
} from "lucide-react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Men's Fashion",
    icon: <Shirt className="md:w-8 w-5 md:h-8 h-5 text-indigo-600" />,
  },
  {
    id: 2,
    title: "Accessories",
    icon: <Watch className="md:w-8 w-5 md:h-8 h-5 text-pink-600" />,
  },
  {
    id: 3,
    title: "All Products",
    icon: <ShoppingBag className="md:w-8 w-5 md:h-8 h-5 text-green-600" />,
  },
  {
    id: 4,
    title: "Salon Items",
    icon: <Scissors className="md:w-8 w-5 md:h-8 h-5 text-red-500" />,
  },
  {
    id: 5,
    title: "Office Wear",
    icon: <Briefcase className="md:w-8 w-5 md:h-8 h-5 text-blue-500" />,
  },
  {
    id: 6,
    title: "Eyewear",
    icon: <Glasses className="md:w-8 w-5 md:h-8 h-5 text-purple-500" />,
  },
  {
    id: 7,
    title: "Packages",
    icon: <Package className="md:w-8 w-5 md:h-8 h-5 text-orange-500" />,
  },
  {
    id: 8,
    title: "Cart",
    icon: <ShoppingCart className="md:w-8 w-5 md:h-8 h-5 text-yellow-600" />,
  },
];

export default function HomeCategory() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl md:mx-auto mx-2">
      <Slider {...settings}>
        {categories.map((category) => (
          <Link to={`/filter`} key={category.id} className="py-10 px-2 md:px-4 ">
            <div className="bg-[var(--secondary-bg-color)] cursor-pointer hover:scale-105 duration-200  shadow-xl rounded-xl md:p-4 p-3 flex flex-col items-center justify-center hover:shadow-lg transition">
              <div className="mb-2">{category.icon}</div>
              <h3 className="md:text-sm text-xs line-clamp-1 font-semibold text-[var(--primary-text-color)] text-center">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
