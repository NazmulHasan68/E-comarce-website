// src/components/common/VerticalProductCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

export default function VerticalProductCarousel({
  data = [],
  title = "Products",
}) {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-2 py-2 md:py-4">
      <div className=" flex items-center justify-between">
        <h1 className="md:text-2xl text-[var(--primary-text-color)] text-xl font-bold mb-2 text-left">
          {title}
        </h1>
        <Link
          to={`/product/${data[0]?.category}`}
          className="text-sm text-[var(--primary-text-color)] hover:font-bold hover:underline m-4 block"
        >
          View more
        </Link>
      </div>
      <Slider {...settings}>
        {data.map(({ id, images, rating, category, price, title }) => (
          <div
            key={id}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => {
                window.location.href = `/product_details/${id}`;
              }, 30);
            }}
            className="md:px-4 px-2 py-3 md:py-6"
          >
            <div className="flex bg-[var(--secondary-bg-color)] rounded-lg shadow hover:shadow-xl cursor-pointer overflow-hidden">
              {/* Image section */}
              <img
                src={
                  images && images.length > 0
                    ? images[0]
                    : "/images/placeholder.png"
                }
                alt={title}
                className="w-28 h-40 object-cover flex-shrink-0"
                loading="lazy"
              />
              {/* Details section */}
              <div className="p-2 flex flex-col justify-between flex-1">
                <h2 className="md:text-md text-sm font-semibold mb-1 text-[var(--primary-text-color)]">
                  {title}
                </h2>
                <p className="md:text-sm text-xs text-gray-600 line-clamp-2">
                  Lorem ipsum, dolor sit amet consectetur adipisicing.
                </p>
                <div className="flex justify-between text-sm mb-1 text-[var(--tertiary-text-color)]">
                  <span className="bg-[var(--primary-gradient)]">
                    {category}
                  </span>
                  <span className="text-yellow-500 text-sm">⭐ {rating}</span>
                </div>
                <p className="text-indigo-600 font-bold text-lg">{price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
