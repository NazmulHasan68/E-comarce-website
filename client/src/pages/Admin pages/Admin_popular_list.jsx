import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";
import {
  useGetProductsQuery,
} from "@/redux/ApiController/productApi";
import { useGetCategoriesQuery } from "@/redux/ApiController/categoryApi";
import { Link } from "react-router-dom";

export default function Admin_popular_list() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const { data: products = [] } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const product = products.filter((p)=>p.isPopular===true)

 console.log(product);
 
  const filteredProducts = product
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
            <option value="">Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm text-gray-700 overflow-auto">
          <thead className="bg-teal-100 text-gray-800">
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
                      to={`/control/popular/view/${product._id}`}
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
