import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ads, products } from "@/components/Common/data";
import AdsCarousel from "@/components/Common/AdsCarousel";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();

  const filteredData = products.filter(
    (item) => item.category?.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="bg-[var(--primary-bg-color)] w-full py-16">
      {/* Back Navigation */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[var(--primary-text-color)] mx-4 md:mx-auto max-w-6xl py-4 font-medium cursor-pointer hover:underline"
      >
        <ArrowLeft />
        Back to Home
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-2 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((product) => {
            const {
              id,
              images = [],
              rating = 0,
              category = "Unknown",
              price = 0,
              title = "Untitled",
              description = "",
            } = product || {};

            return (
              <div
                key={id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setTimeout(() => {
                    navigate(`/product_details/${id}`);
                  }, 300);
                }}
                className="cursor-pointer border rounded-md p-3 hover:shadow-lg transition"
              >
                <img
                  src={images[0] || "https://via.placeholder.com/300x300"}
                  alt={title}
                  className="w-full h-60 object-cover rounded"
                />
                <h2 className="mt-2 font-semibold text-lg line-clamp-1">
                  {title}
                </h2>
                <span className="text-gray-400 line-clamp-1">{category}</span>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {description}
                </p>
                <div className="mt-2 font-bold text-emerald-600">${price}</div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">
            No products found in this category.
          </div>
        )}
      </div>

      {/* Ads Section */}
      <div className="py-12 max-w-6xl mx-auto px-4">
        <AdsCarousel data={ads} />
      </div>
    </div>
  );
}
