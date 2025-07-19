import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  {
    id: 1,
    image:
      "https://www.aazbd.com/wp-content/uploads/2023/08/SOLID-BLACK-scaled.jpg",
    rating: 4.5,
    category: "Men's Fashion",
    price: "$49.99",
    title: "Classic Black Shirt",
    description: "Comfortable cotton fabric, perfect for casual wear.",
  },
  {
    id: 2,
    image:
      "https://theprintshop.co.za/wp-content/uploads/2024/04/IMG-20220716-WA0018-1024x1024.jpg",
    rating: 4.0,
    category: "Accessories",
    price: "$19.99",
    title: "Genuine Leather Wallet",
    description: "Sleek and stylish wallet with multiple card slots.",
  },
  {
    id: 3,
    image:
      "https://chiefapparel.pk/cdn/shop/files/UJS08816_2b6e9352-e885-4b1f-8470-bd6c8a3da568.png?v=1709837321",
    rating: 4.7,
    category: "Footwear",
    price: "$89.99",
    title: "Running Sneakers",
    description: "Lightweight and breathable for your daily runs.",
  },
  {
    id: 4,
    image: "https://fabrilife.com/products/625c18052e21b-square.jpg",
    rating: 4.3,
    category: "Women's Fashion",
    price: "$59.99",
    title: "Elegant Evening Dress",
    description: "Perfect for formal events and parties.",
  },
  {
    id: 5,
    image:
      "https://img.joomcdn.net/551345bf9beee7858a83bce908b250f64894007d_original.jpeg",
    rating: 4.1,
    category: "Jewelry",
    price: "$29.99",
    title: "Silver Necklace",
    description: "Elegant design that complements any outfit.",
  },
  {
    id: 6,
    image:
      "https://static.cilory.com/480395-thickbox_default/octane-blue-full-sleeves-t-shirt-by-nologo.jpg.webp",
    rating: 4.8,
    category: "Bags",
    price: "$99.99",
    title: "Travel Backpack",
    description: "Spacious and durable for all your adventures.",
  },
];

export default function HomeSuggested() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false, 
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-6xl md:mx-auto mx-4 py-8">
      <h1 className="md:text-2xl text-xl font-bold mb-6 text-left text-[var(--primary-text-color)]">
        Suggested Products
      </h1>

      <Slider {...settings}>
        {products.map(({ id, image, rating, category, price, title, description }) => (
          <div key={id} className="px-3 py-6">
            <div className="flex bg-[var(--secondary-bg-color)] rounded-lg shadow hover:shadow-xl cursor-pointer overflow-hidden">
              {/* Image section */}
              <img
                src={image}
                alt={title}
                className="w-32 h-40 object-cover flex-shrink-0"
                loading="lazy"
              />
              {/* Details section */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="md:text-md text-sm font-semibold mb-1 text-[var(--primary-text-color)]">
                  {title}
                </h2>
                <p className="md:text-sm text-xs text-gray-600 mb-1">{description}</p>
                <div className="flex justify-between text-sm mb-1 text-[var(--tertiary-text-color)]">
                  <span className="bg-[var(--primary-gradient)]">{category}</span>
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
