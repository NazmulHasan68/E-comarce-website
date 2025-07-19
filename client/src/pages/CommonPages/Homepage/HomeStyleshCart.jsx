import React from "react";
import Slider from "react-slick";
import { products } from "@/components/Common/data";
import { Link, useNavigate } from "react-router-dom";

export default function HomeStyleshCart({ data = [], title = "Products" }) {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-2 md:mx-auto py-10">
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
        {data.map(
          ({ id, images, rating, category, price, title, description }) => (
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
              <div className="bg-[var(--secondary-bg-color)] rounded-tr-[15%] rounded-bl-[15%] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center h-full">
                <h2 className="md:text-md text-sm font-semibold line-clamp-1 mb-1">
                  {title}
                </h2>
                <img
                  src={
                    images && images.length > 0
                      ? images[0]
                      : "/images/placeholder.png"
                  }
                  alt={`Product image of ${title}`}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-4 border-4 border-[var(--primary-border-color)]"
                  loading="lazy"
                />

                <span className="text-[var(--white-text-color)] font-bold mb-2">
                  ${price.toFixed(2)}
                </span>

                <div className="flex justify-between items-center w-full text-sm mb-1 line-clamp-1">
                  <span className="text-yellow-500 font-semibold line-clamp-1">
                    ⭐ {rating}
                  </span>
                  <span className="text-gray-400 line-clamp-1">{category}</span>
                </div>

                <span className="text-[var(--white-text-color)] font-bold mb-2">
                  {price}
                </span>

                <button className="mt-auto text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
}
