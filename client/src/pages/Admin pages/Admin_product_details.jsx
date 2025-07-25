import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/ApiController/productApi";
import { useGetCategoriesQuery } from "@/redux/ApiController/categoryApi";
import { useGetBandsQuery } from "@/redux/ApiController/bandApi";
import { ArrowLeft } from "lucide-react";

export default function Admin_product_edit() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Fetch product details
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  // Fetch categories and brands for select options
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: bands = [] } = useGetBandsQuery();

  // Mutation to update product
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Form state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [band, setBand] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [madeIn, setMadeIn] = useState("");
  const [images, setImages] = useState([]); // New uploaded images (File objects)
  const [existingImages, setExistingImages] = useState([]); // Existing image URLs
  const [previewUrls, setPreviewUrls] = useState([]);

  const [isPopular, setIsPopular] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);
  const [isBestSelling, setIsBestSelling] = useState(false);

  // Populate form when product data is loaded
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setDiscount(product.discount || "");
      setStock(product.stock || "");
      setCategory(product.category || "");
      setBand(product.band || "");
      setColors(product.colors?.join(", ") || "");
      setSizes(product.sizes?.join(", ") || "");
      setMadeIn(product.madeIn || "");
      setExistingImages(product.images || []);
      setIsPopular(product.isPopular || false);
      setIsSuggested(product.isSuggested || false);
      setIsBestSelling(product.isBestSelling || false);
    }
  }, [product]);

  // Generate preview URLs for new images
  useEffect(() => {
    // Clean up old preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // Remove existing image from list
  const removeExistingImage = (urlToRemove) => {
    setExistingImages(existingImages.filter((url) => url !== urlToRemove));
  };

  // Remove newly added image before upload
  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Submit updated product data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      toast.error("Title and Price are required.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount || 0);
      formData.append("stock", stock || 0);
      formData.append("category", category);
      formData.append("band", band);
      formData.append("colors", colors);
      formData.append("sizes", sizes);
      formData.append("madeIn", madeIn);

      formData.append("isPopular", isPopular);
      formData.append("isSuggested", isSuggested);
      formData.append("isBestSelling", isBestSelling);

      // Append new images
      images.forEach((img) => formData.append("images", img));

      // Append existing images URLs to keep
      existingImages.forEach((url) => formData.append("existingImages", url));

      await updateProduct({ id: productId, formData }).unwrap();

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
            

      toast.success("Product updated successfully!");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  if (isLoading) return <p>Loading product data...</p>;
  if (isError) return <p>Failed to load product data.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-slate-50 opacity-95 rounded">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 hover:text-rose-500 cursor-pointer" onClick={()=>navigate(-1)}>
          <ArrowLeft/> Back
        </div>
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Edit Product</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-none bg-slate-200"
        />

        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-none bg-slate-200"
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            required
            type="number"
            min={0}
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-none bg-slate-200"
          />
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border-none bg-slate-200"
          />
          <Input
            type="number"
            min={0}
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border-none bg-slate-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded border-none bg-slate-200"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>

          <select
            value={band}
            onChange={(e) => setBand(e.target.value)}
            className="border p-2 rounded border-none bg-slate-200"
          >
            <option value="">Select Brand</option>
            {bands.map((band) => (
              <option key={band._id} value={band.bandname}>
                {band.bandname}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Colors (comma separated)"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className="border-none bg-slate-200"
          />
          <Input
            placeholder="Sizes (comma separated)"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="border-none bg-slate-200"
          />
        </div>

        <Input
          placeholder="Made In"
          value={madeIn}
          onChange={(e) => setMadeIn(e.target.value)}
          className="border-none bg-slate-200"
        />

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImages.map((url, i) => (
              <div key={i} className="relative">
                <img
                  src={
                    url.startsWith("http")
                      ? url
                      : `${import.meta.env.VITE_BASE_URL}/public/${url}`
                  }
                  alt={`existing-${i}`}
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Preview new images */}
        {previewUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewUrls.map((url, i) => (
              <div key={i} className="relative">
                <img
                  src={url}
                  alt={`preview-${i}`}
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(i)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload new images */}
        <input
          type="file"
          accept="image/*"
          multiple
          className="block w-full mt-4"
          onChange={handleImageChange}
        />

        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Popular */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="popular" className="text-sm font-medium text-gray-800">
              Popular
            </label>
            <Switch
              id="popular"
              checked={isPopular}
              onCheckedChange={setIsPopular}
              className="data-[state=checked]:bg-emerald-600
                         data-[state=unchecked]:bg-rose-500
                         after:top-0.2 after:left-0.2 after:bg-slate-50
                         relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center
                         rounded-full transition-colors duration-300
                         after:absolute after:h-6 after:w-6 after:rounded-full
                         after:shadow-md after:transition-transform after:duration-300
                         data-[state=checked]:after:translate-x-7"
            />
          </div>

          {/* Suggested */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="suggested" className="text-sm font-medium text-gray-800">
              Suggested
            </label>
            <Switch
              id="suggested"
              checked={isSuggested}
              onCheckedChange={setIsSuggested}
              className="data-[state=checked]:bg-emerald-600
                         data-[state=unchecked]:bg-rose-500
                         after:top-0.2 after:left-0.2 after:bg-slate-50
                         relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center
                         rounded-full transition-colors duration-300
                         after:absolute after:h-6 after:w-6 after:rounded-full
                         after:shadow-xl after:transition-transform after:duration-300
                         data-[state=checked]:after:translate-x-7"
            />
          </div>

          {/* Best Selling */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="bestSelling" className="text-sm font-medium text-gray-800">
              Best Selling
            </label>
            <Switch
              id="bestSelling"
              checked={isBestSelling}
              onCheckedChange={setIsBestSelling}
              className="data-[state=checked]:bg-emerald-600
                         data-[state=unchecked]:bg-rose-500
                         after:top-0.2 after:left-0.2 after:bg-slate-50
                         relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center
                         rounded-full transition-colors duration-300
                         after:absolute after:top-0.2 after:left-0.2 after:h-6 after:w-6
                         after:rounded-full after:shadow-md after:transition-transform after:duration-300
                         data-[state=checked]:after:translate-x-7"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
