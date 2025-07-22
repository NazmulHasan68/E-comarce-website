import React, { useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { Trash, ShoppingCartIcon, Heart, CheckCircle } from "lucide-react";
import { addToLike, removeLike } from "@/redux/features/LikeSlice";

export default function HomeStyleshCart({ data = [], title = "Products" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const likeItems = useSelector((state) => state.like.likedItems);

  const isInCart = (id) => cartItems.some((item) => item.id === id);
  const isLiked = (product) => likeItems?.some((item) => item.id === product.id);


  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  
    const handleAddToLike = (e, product) => {
      e.stopPropagation();
      dispatch(addToLike(product));
    };
  
    const handleRemoveLike = (e, product) => {
        e.stopPropagation();
        dispatch(removeLike(product.id));
    };

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
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-2 md:mx-auto py-10">
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
        {data.map((item) => {
          const { id, images, category, price, title } = item;

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
              <div className="bg-[var(--secondary-bg-color)] rounded-tr-[15%] rounded-bl-[15%] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center h-full">
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

                 <h2 className="md:text-md text-sm font-semibold line-clamp-1 mb-1">
                  {title}
                </h2>

                <div className="flex justify-between items-center w-full text-sm mb-1 line-clamp-1">
                  <span className="text-blue-500 text-md font-semibold line-clamp-1">
                    Price: ৳{price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-clamp-1">{category}</span>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2">
                  {isInCart(id) ? (
                    <button
                      className="text-red-600 bg-red-100 p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromCart(item);
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
                        handleAddToCart(item);
                      }}
                      aria-label="Add to cart"
                    >
                      <ShoppingCartIcon />
                    </button>
                  )}

                  {isLiked(item) ? (
                      <button
                        className="text-emerald-600 bg-emerald-200 p-2 rounded-full"
                        onClick={(e) => handleRemoveLike(e, item)}
                        aria-label="Remove from wishlist"
                      >
                        <CheckCircle  />
                      </button>
                    ) : (
                      <button
                        className="text-rose-600 bg-rose-100 p-2 rounded-full"
                        onClick={(e) => handleAddToLike(e, item)}
                        aria-label="Add to wishlist"
                      >
                        <Heart />
                      </button>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
