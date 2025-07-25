import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/ApiController/productApi";
import { useGetCategoriesQuery } from "@/redux/ApiController/categoryApi";
import { useGetBandsQuery } from "@/redux/ApiController/bandApi";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Admin_product_updated() {
  const { productId } = useParams();
   const navigate = useNavigate()
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: bands = [] } = useGetBandsQuery();

  const [preview, setPreview] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    category: "",
    brand: "",
    colors: [],
    sizes: [],
    madeIn: "",
    images: [],
    isPopular: false,
    isSuggested: false,
    isBestSelling: false,
  });

  useEffect(() => {
    if (product) {
      setPreview({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        discount: product.discount || "",
        stock: product.stock || "",
        category: product.category || "",
        brand: product.brand || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        madeIn: product.madeIn || "",
        images: product.images || [],
        isPopular: product.isPopular || false,
        isSuggested: product.isSuggested || false,
        isBestSelling: product.isBestSelling || false,
      });
    }
  }, [product]);

  if (isLoading) return <p className="text-center py-8 text-gray-500">Loading product data...</p>;
  if (isError) return <p className="text-center py-8 text-red-500">Failed to load product data.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white opacity-95 rounded-xl shadow-md">
    <div className=" flex justify-between hover:text-rose-600 items-center">
        <h1 className="flex gap-3 cursor-pointer hover:scale-105" onClick={()=>navigate(-1)}><MoveLeft/> Back</h1>
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Product Details</h2>
    </div>

      <div className="space-y-4 text-gray-700">
        <div><strong>Title:</strong> {preview.title}</div>
        <div><strong>Description:</strong> {preview.description}</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><strong>Price:</strong> TK. {preview.price}</div>
          <div><strong>Discount:</strong> {preview.discount}%</div>
          <div><strong>Stock:</strong> {preview.stock}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><strong>Category:</strong> {preview.category}</div>
          <div><strong>Brand:</strong> {preview.brand}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><strong>Colors:</strong> {preview.colors.join(", ")}</div>
          <div><strong>Sizes:</strong> {preview.sizes.join(", ")}</div>
        </div>

        <div><strong>Made In:</strong> {preview.madeIn}</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <strong>Popular:</strong>{" "}
            <span className={preview.isPopular ? "text-green-600" : "text-red-600"}>
              {preview.isPopular ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <strong>Suggested:</strong>{" "}
            <span className={preview.isSuggested ? "text-green-600" : "text-red-600"}>
              {preview.isSuggested ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <strong>Best Selling:</strong>{" "}
            <span className={preview.isBestSelling ? "text-green-600" : "text-red-600"}>
              {preview.isBestSelling ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Product Images */}
        {preview.images.length > 0 && (
          <div className="mt-6">
            <strong>Images:</strong>
            <div className="flex flex-wrap gap-3 mt-2">
              {preview.images.map((url, i) => (
                <img
                  key={i}
                  src={
                    url.startsWith("http")
                      ? url
                      : `${import.meta.env.VITE_BASE_URL}/public/${url}`
                  }
                  alt={`product-${i}`}
                  className="md:w-40 md:h-32 w-24 h-20 object-cover rounded-lg border border-gray-300"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
