import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCarousel({ data = [], title = "Products" }) {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-2 py-2 md:py-4 bg-[var(--primary-bg-color)] ">
      <div className=" flex items-center justify-between">
        <h1 className="md:text-2xl text-xl font-bold mb-2 text-left">
          {title}
        </h1>
        <Link  to={`/product/${data[0]?.category}`} className="text-sm text-[var(--primary-text-color)] hover:font-bold hover:underline m-4 block">
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
            <div className="border bg-[var(--secondary-bg-color)] cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-xl transition">
              <img src={images && images.length > 0 ? images[0] : "/images/placeholder.png"} alt={title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-500 font-semibold text-sm">⭐{rating}</span>
                  <span className="text-xs md:text-sm text-[var(--tertiary-text-color)] line-clamp-1">{category}</span>
                </div>
                <h2 className="text-sm md:text-lg text-[var(--primary-text-color)] font-semibold mb-1 line-clamp-1">{title}</h2>
                <p className="text-[var(--white-text-color)] font-bold">{price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}