import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "@/redux/ApiController/productApi";
import { useGetCategoriesQuery } from "@/redux/ApiController/categoryApi";
import { useGetBandsQuery } from "@/redux/ApiController/bandApi";
import { Link } from "react-router-dom";

export default function Admin_product_list() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const { data: products = [] } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="md:p-6 p-2 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex w-full md:w-2/3 gap-2">
          <div className="relative flex-grow">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 py-3 border border-gray-300 bg-slate-50 rounded-full"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1 px-4 border border-gray-300 rounded-3xl text-gray-600"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <AddProduct />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm text-gray-700 overflow-auto">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">View</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="p-1 border">
                    {product.images?.[0] ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/public/${product.images[0]}`}
                        alt={`${product.title}-image`}
                        className="w-16 h-8 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="p-2 border font-semibold">{product.title}</td>
                  <td className="p-2 border">৳{product.price.toFixed(2)}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            size="sm"
            variant={num === page ? "default" : "outline"}
            onClick={() => setPage(num)}
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
}

function AddProduct() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [sales, setSales] = useState("");
  const [link, setLink] = useState("");
  const [madeIn, setMadeIn] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const { data: catagoryData = [] } = useGetCategoriesQuery();
  const { data: bandData = [] } = useGetBandsQuery();

  // Control dialog close manually after submission
  const dialogCloseRef = useRef(null);

  useEffect(() => {
    // Clean up old URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || images.length === 0) {
      toast.error("Title, Price, and at least 1 image are required.");
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
      formData.append("band", brand);
      formData.append("colors", colors);
      formData.append("sizes", sizes);
      formData.append("sales", sales || 0);
      formData.append("link", link);
      formData.append("madeIn", madeIn);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await createProduct(formData).unwrap();
      toast.success("Product created successfully!");

      // Reset form fields
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setStock("");
      setCategory("");
      setBrand("");
      setColors("");
      setSizes("");
      setSales("");
      setLink("");
      setMadeIn("");
      setImages([]);

      // Close the dialog programmatically
      if (dialogCloseRef.current) dialogCloseRef.current.click();
    } catch (error) {
      toast.error("Failed to create product.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white">
          <Plus className="w-4 h-4" /> Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            />
            <Input
              type="number"
              min={0}
              max={100}
              placeholder="Discount %"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <Input
              type="number"
              min={0}
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {catagoryData?.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Brand</option>
              {bandData?.map((band) => (
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
            />
            <Input
              placeholder="Sizes (comma separated)"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Input
              placeholder="Made In"
              value={madeIn}
              onChange={(e) => setMadeIn(e.target.value)}
            />
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            className="block w-full"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImages((prev) => [...prev, ...files]);
            }}
          />

          <div className="flex gap-2 flex-wrap mt-2">
            {previewUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`preview-${i}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>

          <div className="flex justify-end">
            {/* Hidden button to programmatically close dialog */}
            <DialogClose asChild>
              <button ref={dialogCloseRef} style={{ display: "none" }}>
                Close
              </button>
            </DialogClose>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
