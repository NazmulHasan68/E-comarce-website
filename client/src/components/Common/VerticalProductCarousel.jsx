import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { Trash, ShoppingCartIcon, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";

export default function VerticalProductCarousel({
  data = [],
  title = "Products",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Wishlist local state
  const [wishlist, setWishlist] = useState({});

  // Cart items from redux
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Check if product (with size/color not considered here) is in cart by id
  const isInCart = (product) =>
    cartItems.some((item) => item.id === product.id);

  // Toggle wishlist for product id
  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

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
      <div className="flex items-center justify-between">
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
        {data.map((product) => {
          const { id, images, category, price, title } = product;

          return (
            <div
              key={id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  navigate(`/product_details/${id}`);
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
                  <Link to={`/product_details/${id}`} className="md:text-md text-sm font-semibold mb-1 text-[var(--primary-text-color)]">
                    {title}
                  </Link>
                  <Link to={`/product_details/${id}`} className="flex justify-between text-sm mb-1 text-[var(--tertiary-text-color)] px-2">
                    <p className="text-indigo-600 font-bold text-lg">
                      Price : ৳{price}
                    </p>
                    <span className="bg-[var(--primary-gradient)]">{category}</span>
                  </Link>

                  <div className="flex items-center justify-between p-2">
                {isInCart(product) ? (
                  <button
                    className="text-red-600 bg-red-100 p-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent slider click
                      handleRemoveFromCart(product);
                    }}
                    aria-label="Remove from cart"
                  >
                    <Trash />
                  </button>
                ) : (
                  <button
                    className="text-blue-600 bg-blue-100 p-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    aria-label="Add to cart"
                  >
                    <ShoppingCartIcon />
                  </button>
                )}

                <button
                  className={`text-green-600 p-2 rounded-full ${
                    wishlist[id] ? "bg-green-300" : "bg-green-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(id);
                  }}
                  aria-label="Toggle wishlist"
                >
                  <Heart />
                </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
