import React, { useState, useEffect } from "react";
import { brand, category, products } from "@/components/Common/data";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import ProductFilter from "@/components/Common/ProductFilter";

export default function FilterLayout() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query params into a Map of arrays, e.g. category=Shirt&category=Hoodie
  const getParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      sort: params.get("sort") || "default",
      tags: params.getAll("tag"),
      categories: params.getAll("category"),
      brands: params.getAll("brand"),
    };
  };

  const [filters, setFilters] = useState(getParams());

  // When URL changes, update local state filters accordingly
  useEffect(() => {
    setFilters(getParams());
  }, [location.search]);

  // Update URL query params when a filter changes
  const updateQuery = (param, value, checked) => {
    const params = new URLSearchParams(location.search);
    const currentValues = params.getAll(param);

    if (checked) {
      // Add value if not present
      if (!currentValues.includes(value)) currentValues.push(value);
    } else {
      // Remove value if present
      const index = currentValues.indexOf(value);
      if (index > -1) currentValues.splice(index, 1);
    }

    // Remove all current param entries
    params.delete(param);
    // Add updated values back
    currentValues.forEach((val) => params.append(param, val));

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const updateSort = (value) => {
    const params = new URLSearchParams(location.search);
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
    const [searchitem, setsearchitem] = useState("");

    // Assuming `products` is your array of product objects
    const filterproduct = products.filter((pro) =>
      pro.title.toLowerCase().includes(searchitem.toLowerCase()) ||
      pro.category.toLocaleLowerCase().includes(searchitem.toLocaleLowerCase)
    );

  return (
    <div className="bg-[var(--primary-bg-color)] w-full mt-16">
      <div className="max-w-7xl md:mx-auto  mx-2 flex flex-col md:flex-row">
        {/* Sidebar desktop */}
        <aside className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-100 p-4 md:basis-1/4 rounded-md">
          <Sidebar
            filters={filters}
            updateQuery={updateQuery}
            updateSort={updateSort}
          />
        </aside>

        {/* Main content */}
        <main className="max-w-6xl mx-1 py-4 md:basis-3/4 h-screen overflow-auto">
          <div className="flex items-center w-full justify-between px-1 md:px-4 gap-1 mb-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchitem}
              onChange={(e)=>setsearchitem(e.target.value)}
              className="flex-1 ml-2 px-4 py-2 basis-2/3 border rounded-md focus:outline-none focus:ring"
            />
            <button
              className="md:hidden flex basis-1/3 gap-1 bg-white border justify-center items-center py-2 rounded shadow"
              onClick={() => setShowMobileFilter(true)}
            >
              <Menu size={18} />
              Filters
            </button>
          </div>

          {/* Product grid */}
          <div className="">
            <ProductFilter data={filterproduct} title="All Product"/>
          </div>
        </main>
      </div>

      {/* Mobile sidebar */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="w-64 bg-white h-full p-4 shadow-xl overflow-y-auto">
            <button
              className="text-sm text-red-500 mb-4"
              onClick={() => setShowMobileFilter(false)}
            >
              ✕ Close
            </button>
            <Sidebar
              filters={filters}
              updateQuery={updateQuery}
              updateSort={updateSort}
            />
          </div>
          <div className="flex-1" onClick={() => setShowMobileFilter(false)} />
        </div>
      )}
    </div>
  );
}

function Sidebar({ filters, updateQuery, updateSort }) {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Filter</h1>

      {/* Sort */}
      <div className="flex flex-col justify-end mb-4">
        <label
          htmlFor="sort"
          className="mr-2 my-2 text-sm font-medium text-gray-700"
        >
          Sort By:
        </label>
        <select
          id="sort"
          className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700"
          value={filters.sort}
          onChange={(e) => updateSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="new-arrivals">New Arrivals</option>
          <option value="top-rated">Top Rated</option>
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Popular Tags</h2>
        <ul className="space-y-1">
          {["Bestsellers", "Suggested", "Popular", "Combo"].map((tag, i) => (
            <li key={i}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={(e) => updateQuery("tag", tag, e.target.checked)}
                />
                {tag}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <ul className="space-y-1">
          {category.map((item, i) => (
            <li key={i}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(item)}
                  onChange={(e) => updateQuery("category", item, e.target.checked)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Brands</h2>
        <ul className="space-y-1">
          {brand.map((item, i) => (
            <li key={i}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(item)}
                  onChange={(e) => updateQuery("brand", item, e.target.checked)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


















// import { brand, category } from "@/components/Common/data";
// import React, { useState } from "react";
// import { Menu } from "lucide-react"; // optional: for hamburger icon

// export default function FilterLayout() {
//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   const onSortChange = (value) => {
//     console.log("Sort:", value);
//   };

//   return (
//     <div className="bg-[var(--primary-bg-color)] w-full mt-16">
//       <div className="max-w-7xl md:mx-auto mx-2 flex flex-col md:flex-row">
//         {/* SIDEBAR FOR DESKTOP */}
//         <aside className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-100 p-4 md:basis-1/4 rounded-md">
//           <Sidebar />
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="w-full py-8 md:basis-3/4">
//           {/* Top bar with search and mobile filter toggle */}
//           <div className="flex items-center justify-between px-4 gap-2 mb-4">
  
//             {/* Search bar */}
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="flex-1 ml-4 px-4 py-2 border rounded-md focus:outline-none focus:ring"
//             />

//             {/* Mobile Filter Toggle */}
//             <button
//               className="md:hidden flex items-center gap-1 bg-white border px-3 py-2 rounded shadow"
//               onClick={() => setShowMobileFilter(true)}
//             >
//               <Menu size={18} />
//               Filters
//             </button>
//           </div>

//           {/* Product Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
//             <div className="border p-4 rounded shadow">Product 1</div>
//             <div className="border p-4 rounded shadow">Product 2</div>
//             <div className="border p-4 rounded shadow">Product 3</div>
//           </div>
//         </main>
//       </div>

//       {/* MOBILE SLIDE-OVER SIDEBAR */}
//       {showMobileFilter && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
//           <div className="w-64 bg-white h-full p-4 shadow-xl overflow-y-auto">
//             <button
//               className="text-sm text-red-500 mb-4"
//               onClick={() => setShowMobileFilter(false)}
//             >
//               ✕ Close
//             </button>
//             <Sidebar />
//           </div>
//           <div
//             className="flex-1"
//             onClick={() => setShowMobileFilter(false)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// // Sidebar Component
// function Sidebar() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Filter</h1>

//       {/* Sort */}
//       <div className="flex flex-col justify-end mb-4">
//         <label htmlFor="sort" className="mr-2 my-2 text-sm font-medium text-gray-700">
//           Sort By:
//         </label>
//         <select
//           id="sort"
//           className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700"
//         >
//           <option value="default">Default</option>
//           <option value="low-to-high">Price: Low to High</option>
//           <option value="high-to-low">Price: High to Low</option>
//           <option value="new-arrivals">New Arrivals</option>
//           <option value="top-rated">Top Rated</option>
//         </select>
//       </div>

//       {/* Tags */}
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Popular Tags</h2>
//         <ul className="space-y-1">
//           {["Bestsellers", "Suggested", "Popular", "Combo"].map((tag, i) => (
//             <li key={i}>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" />
//                 {tag}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Categories */}
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Categories</h2>
//         <ul className="space-y-1">
//           {category.map((item, i) => (
//             <li key={i}>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" />
//                 {item}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Brands */}
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Brands</h2>
//         <ul className="space-y-1">
//           {brand.map((item, i) => (
//             <li key={i}>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" />
//                 {item}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
