import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ads, products } from '@/components/Common/data';
import ProductCarousel from '@/components/Common/ProductCarousel';
import VerticalProductCarousel from '@/components/Common/VerticalProductCarousel';
import AdsCarousel from '@/components/Common/AdsCarousel';
import HomeStyleshCart from '../Homepage/HomeStyleshCart';

export default function Product_details_main() {
  const { productId } = useParams();
  const filterProduct = products.find((product) => product.id == productId);

  const [mainImage, setMainImage] = useState(filterProduct?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!filterProduct) {
    return <div className="p-6">Product not found</div>;
  }

  const relevantProducts = products.filter(
    (p) => p.category === filterProduct.category && p.id !== filterProduct.id
  );

  const mostProducts = products.filter(
    (p) => p.isPopular === true && p.id !== filterProduct.id
  );

  const sugeestedProducts = products.filter(
    (p) => p.isSuggested === true && p.id !== filterProduct.id
  );

  return (
    <div className="p-1 space-y-4 bg-[var(--primary-bg-color)] mt-16">
      {/* Product Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto bg-[var(--tertiary-bg-color)] p-2 md:p-4 rounded-lg space-y-4">
        {/* Image Section */}
        <div >
          <div className="border rounded-lg overflow-hidden mb-2">
            <img src={mainImage} alt="Main" className="w-full h-48 md:h-96 object-cover" />
          </div>

          <div className="flex space-x-2 overflow-auto">
            {filterProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
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
          <h2 className="md:text-2xl text-xl font-bold text-[var(--primary-text-color)]">{filterProduct.title}</h2>
          <p className="text-sm line-clamp-3">{filterProduct.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptas enim prov</p>
          <p><strong>Made In:</strong> {filterProduct.madeIn}</p>

          {/* Sizes */}
          <div>
            <p className=" font-semibold mb-1">Sizes:</p>
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
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className=" font-semibold mb-1">Colors:</p>
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
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="text-lg">
            <span className=" line-through mr-2">${filterProduct.price}</span>
            <span className="font-bold text-xl">${filterProduct.finalPrice}</span>
            <span className="ml-2 text-blue-500">({filterProduct.discount}% OFF)</span>
          </div>
          <p className="text-yellow-600">⭐ {filterProduct.rating} ({filterProduct.totalReviews} reviews)</p>
          {/* Add to Cart */}
          <button
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition-all duration-300"
            onClick={() => {
              if (!selectedSize || !selectedColor) {
                alert("Please select both size and color.");
                return;
              }

            }}
          >
            Add to Cart
          </button>
        </div>

      </div>

      <div className='max-w-4xl md:mx-auto mx-3 bg-[var(--tertiary-bg-color)] p-3'> {/* Product Details */}
          <div>
            <h3 className="text-[var(--primary-text-color)] font-semibold mb-1">Product Details:</h3>
            <div className="text-[var(--th-text-color)] text-sm space-y-1">
              <p><strong>Material:</strong> {filterProduct.productDetails.material}</p>
              <p><strong>Wash Care:</strong> {filterProduct.productDetails.washCare}</p>
              <p><strong>Fit:</strong> {filterProduct.productDetails.fit}</p>
            </div>
          </div>
      </div>

      {/* Relevant Products */}
      <div className="max-w-6xl mx-auto">
        <ProductCarousel data={relevantProducts} title="You may also like" />
        <VerticalProductCarousel data={mostProducts} title='Most popular item'/>
        <AdsCarousel data={ads} />
        <HomeStyleshCart data={sugeestedProducts} title='Sugested products'/>
      </div>
    </div>
  );
}
