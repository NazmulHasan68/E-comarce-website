import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CheckCircle, Heart, ShoppingCartIcon, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/features/cartSlice';
import { Link } from 'react-router-dom';
import { addToLike, removeLike } from '@/redux/features/LikeSlice';

export default function ProductCarousel({ data = [], title = "Products" }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const likeItems = useSelector((state) => state.like.likedItems);

  const isLiked = (product) => likeItems?.some((item) => item.id === product.id);

  const isInCart = (product) => {
    return cartItems.some(
      item =>
        item.id === product.id &&
        (item.size === product.size || (!item.size && !product.size)) &&
        (item.color === product.color || (!item.color && !product.color))
    );
  };

  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = id => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = product => {
    dispatch(removeFromCart({
      id: product.id,
      size: product.size, // optional
      color: product.color, // optional
    }));
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2); // 2 decimal places
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
    <div className="max-w-6xl mx-auto px-2 py-2 md:py-4 bg-[var(--primary-bg-color)]">
      <h1 className="md:text-2xl text-xl font-bold mb-4">{title}</h1>

      <Slider {...settings}>
        {data.map((product) => {
          const { id, images, category, price, title } = product;

          return (
            <div key={id} className="md:px-4 px-2 py-3 md:py-6">
              <div className="border bg-[var(--secondary-bg-color)] shadow hover:shadow-xl rounded-lg">
                <Link to={`/product_details/${id}`} className="cursor-pointer rounded-t-lg overflow-hidden">
                  <img
                    src={images?.[0] ?? "/images/placeholder.png"}
                    alt={title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-2">
                    <h2 className="text-lg font-semibold text-[var(--primary-text-color)] line-clamp-1">
                      {title}
                    </h2>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-bold text-[var(--white-text-color)]">
                        ${formatPrice(price)}
                      </span>
                      <span className="text-sm text-[var(--tertiary-text-color)]">{category}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between p-2">
                  {isInCart(product) ? (
                    <button
                      className="text-red-600 bg-red-100 p-2 rounded-full"
                      onClick={() => handleRemoveFromCart(product)}
                      aria-label="Remove from cart"
                    >
                      <Trash />
                    </button>
                  ) : (
                    <button
                      className="text-blue-600 bg-blue-100 p-2 rounded-full"
                      onClick={() =>
                        handleAddToCart({ ...product, quantity: 1 })
                      }
                      aria-label="Add to cart"
                    >
                      <ShoppingCartIcon />
                    </button>
                  )}

                  {isLiked(product) ? (
                      <button
                        className="text-emerald-600 bg-emerald-200 p-2 rounded-full"
                        onClick={(e) => handleRemoveLike(e, product)}
                        aria-label="Remove from wishlist"
                      >
                        <CheckCircle   />
                      </button>
                    ) : (
                      <button
                        className="text-rose-600 bg-rose-100 p-2 rounded-full"
                        onClick={(e) => handleAddToLike(e, product)}
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
