import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/features/cartSlice';
import { ads, products } from '@/components/Common/data';
import ProductCarousel from '@/components/Common/ProductCarousel';
import VerticalProductCarousel from '@/components/Common/VerticalProductCarousel';
import AdsCarousel from '@/components/Common/AdsCarousel';
import HomeStyleshCart from '../Homepage/HomeStyleshCart';

export default function Product_details_main() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const filterProduct = products.find(
    (product) => product.id === Number(productId)
  );

  const [mainImage, setMainImage] = useState(filterProduct?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (filterProduct) {
      setSelectedSize('');
      setSelectedColor('');
      setMainImage(filterProduct.images?.[0]);
    }
  }, [filterProduct]);

  if (!filterProduct) {
    return <div className="p-6">Product not found</div>;
  }

  const isInCart = cartItems.some(
    (item) =>
      item.id === filterProduct.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  const handleAddOrRemove = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color.');
      return;
    }

    const payload = {
      id: filterProduct.id,
      title: filterProduct.title,
      images: filterProduct.images,
      price: Number(filterProduct.finalPrice),
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    if (isInCart) {
      dispatch(removeFromCart(payload));
    } else {
      dispatch(addToCart(payload));
    }
  };

  const relevantProducts = products.filter(
    (p) => p.category === filterProduct.category && p.id !== filterProduct.id
  );
  const mostProducts = products.filter(
    (p) => p.isPopular && p.id !== filterProduct.id
  );
  const suggestedProducts = products.filter(
    (p) => p.isSuggested && p.id !== filterProduct.id
  );

  return (
    <div className="p-1 space-y-4 bg-[var(--primary-bg-color)] mt-16">
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto bg-[var(--tertiary-bg-color)] p-2 md:p-4 rounded-lg space-y-4">
        {/* Image Section */}
        <div>
          <div className="border rounded-lg overflow-hidden mb-2">
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-auto">
            {filterProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
                  mainImage === img ? 'border-blue-500' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 text-[var(--primary-text-color)] opacity-85">
          <h2 className="md:text-2xl text-xl font-bold">
            {filterProduct.title}
          </h2>
          <p className="text-sm">{filterProduct.description}</p>
          <p>
            <strong>Made In:</strong> {filterProduct.madeIn}
          </p>

          {/* Sizes */}
          {filterProduct.sizes?.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Sizes:</p>
              <div className="flex gap-2">
                {filterProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 rounded border ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-black'
                    }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {filterProduct.colors?.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Colors:</p>
              <div className="flex gap-2">
                {filterProduct.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-600 text-white'
                        : 'bg-white text-black'
                    }`}
                    aria-pressed={selectedColor === color}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Section */}
          <div className="text-lg">
            <span className="line-through mr-2">
              ৳{Number(filterProduct.price).toFixed(2)}
            </span>
            <span className="font-bold text-xl">
              ৳{Number(filterProduct.finalPrice).toFixed(2)}
            </span>
            <span className="ml-2 text-blue-500">
              ({filterProduct.discount}% OFF)
            </span>
          </div>

          <p className="text-yellow-600">
            ⭐ {filterProduct.rating} ({filterProduct.totalReviews} reviews)
          </p>

          <button
            className={`mt-4 w-full ${
              isInCart
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white py-3 rounded transition-all duration-300`}
            onClick={handleAddOrRemove}
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-4xl md:mx-auto mx-3 bg-[var(--tertiary-bg-color)] p-3">
        <h3 className="text-[var(--primary-text-color)] font-semibold mb-1">
          Product Details:
        </h3>
        <div className="text-[var(--th-text-color)] text-sm space-y-1">
          <p>
            <strong>Material:</strong>{' '}
            {filterProduct.productDetails.material}
          </p>
          <p>
            <strong>Wash Care:</strong>{' '}
            {filterProduct.productDetails.washCare}
          </p>
          <p>
            <strong>Fit:</strong> {filterProduct.productDetails.fit}
          </p>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="max-w-6xl mx-auto">
        <ProductCarousel data={relevantProducts} title="You may also like" />
        <VerticalProductCarousel
          data={mostProducts}
          title="Most popular item"
        />
        <AdsCarousel data={ads} />
        <HomeStyleshCart data={suggestedProducts} title="Suggested products" />
      </div>
    </div>
  );
}
