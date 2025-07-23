import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { Trash, ShoppingCartIcon, Heart } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { addToLike, removeLike } from "@/redux/features/LikeSlice";
import { useMediaQuery } from "react-responsive";

export default function VerticalProductCarousel({ data = [], title = "Products" }) {
  const isBigScreen = useMediaQuery({ minWidth: 1024 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const likeItems = useSelector((state) => state.like.likedItems);

  const isInCart = (product) => cartItems?.some((item) => item.id === product.id);
  const isLiked = (product) => likeItems?.some((item) => item.id === product.id);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = (e, product) => {
    e.stopPropagation();
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
        <h1 className="md:text-2xl text-xl font-bold text-[var(--primary-text-color)] mb-2">
          {title}
        </h1>
        <Link
          to={`/product/${data[0]?.category ?? "all"}`}
          className="text-sm text-[var(--primary-text-color)] hover:font-bold hover:underline m-4"
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
                <img
                  src={images?.[0] ?? "/images/placeholder.png"}
                  alt={title}
                  className="w-28 h-40 object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="p-2 flex flex-col justify-between flex-1">
                  <Link
                    to={`/product_details/${id}`}
                    className="md:text-md text-sm font-semibold mb-1 text-[var(--primary-text-color)]"
                  >
                    {title}
                  </Link>

                  <div className="flex justify-between items-center text-sm mb-1 text-[var(--tertiary-text-color)] px-2">
                    <p className="text-indigo-600 font-bold text-lg">
                      Price: ৳
                      {Number(price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <span className="bg-[var(--primary-gradient)] px-2 py-0.5 rounded text-xs text-blue-500">
                      {category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2">
                    {isInCart(product) ? (
                      <button
                        className="text-red-600 bg-red-100 p-2 rounded-full"
                        onClick={(e) => handleRemoveFromCart(e, product)}
                        aria-label="Remove from cart"
                      >
                        <Trash size={isBigScreen ? 22 : 18}/>
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 bg-blue-100 p-2 rounded-full"
                        onClick={(e) => handleAddToCart(e, product)}
                        aria-label="Add to cart"
                      >
                        <ShoppingCartIcon size={isBigScreen ? 22 : 18}/>
                      </button>
                    )}

                    {isLiked(product) ? (
                      <button
                        className="text-emerald-600 bg-emerald-200 p-2 rounded-full"
                        onClick={(e) => handleRemoveLike(e, product)}
                        aria-label="Remove from wishlist"
                      >
                        <CheckCircle  size={isBigScreen ? 22 : 18} />
                      </button>
                    ) : (
                      <button
                        className="text-rose-600 bg-rose-100 p-2 rounded-full"
                        onClick={(e) => handleAddToLike(e, product)}
                        aria-label="Add to wishlist"
                      >
                        <Heart size={isBigScreen ? 22 : 18}/>
                      </button>
                    )}
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
