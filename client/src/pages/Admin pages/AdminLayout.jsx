import React, { useState } from "react";
import { Outlet, Link, useLocation} from "react-router-dom";
import { Menu, MoveRight } from "lucide-react";
import {
  LayoutDashboard,
  PackageCheck,
  Clock,
  Loader,
  Truck,
  CheckCheck,
  Ban,
  Flame,
  Lightbulb,
  TrendingUp,
  Layers,
  Users,
  Image,
} from "lucide-react";


export default function AdminLayout() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <div className="bg-[var(--primary-bg-color)] w-full mt-16">
      <div className="max-w-7xl md:mx-auto mx-2 flex flex-col md:flex-row">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white p-4 md:basis-1/4 border-r shadow-md rounded-md">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="max-w-6xl mx-1 py-4 md:basis-3/4 h-screen overflow-auto">


          <div className="flex items-center justify-between px-2 md:px-4 gap-2 mb-4">
            <h1 className="md:hidden text-sky-500 font-bold text-xl">
                Admin Control panel
            </h1>
            <button
              className="md:hidden flex gap-2 bg-white border px-3 py-2 items-center rounded shadow text-sm"
              onClick={() => setShowMobileFilter(true)}
            >
              <Menu size={18} />
              Menu
            </button>
          </div>

          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="w-64 bg-white h-full p-4 shadow-xl overflow-y-auto">
            <button
              className="text-sm text-red-500 mb-4 ml-[70%]"
              onClick={() => setShowMobileFilter(false)}
            >
              ✕ Close
            </button>
            <Sidebar />
          </div>
          <div
            className="flex-1"
            onClick={() => setShowMobileFilter(false)}
          />
        </div>
      )}
    </div>
  );
}

const Sidebar = () => {
  const location = useLocation();

  const items = [
    { label: "Dashboard", path: "/control/", icon: <LayoutDashboard size={18} /> },
    { label: "Product List", path: "/control/product_list", icon: <PackageCheck size={18} /> },
    { label: "Pending Orders", path: "/control/pending_list", icon: <Clock size={18} /> },
    { label: "Processing Orders", path: "/control/proceing_list", icon: <Loader size={18} /> },
    { label: "Delivered Orders", path: "/control/delivered_list", icon: <Truck size={18} /> },
    { label: "Completed Orders", path: "/control/completed_list", icon: <CheckCheck size={18} /> },
    { label: "Rejected Orders", path: "/control/rejected_list", icon: <Ban size={18} /> },
    { label: "Popular Products", path: "/control/popular", icon: <Flame size={18} /> },
    { label: "Suggested Products", path: "/control/suggested", icon: <Lightbulb size={18} /> },
    { label: "Best Selling", path: "/control/best_selling", icon: <TrendingUp size={18} /> },
    { label: "Categories & Brands", path: "/control/catagory_band", icon: <Layers size={18} /> },
    { label: "User List", path: "/control/users", icon: <Users size={18} /> },
    { label: "Banner & Ads", path: "/control/banner_ads", icon: <Image size={18} /> },
  ];

  return (
    <div className="md:p-4 bg-white border-r border-gray-200 min-h-screen ">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Shadow Admin</h1>
      <nav className="flex flex-col gap-1">
        {items.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 py-2 px-4 text-sm font-medium transition-all  rounded-xl
                ${
                  isActive
                    ? " text-white border-l-4 border-teal-500 font-bold shadow-md bg-blue-400"
                    : "text-gray-700 hover:bg-blue-200 bg-slate-50"
                }`}
            >
              {item.icon}
              {item.label}
              {isActive ? <MoveRight/> : ''}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
