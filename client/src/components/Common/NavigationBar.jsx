import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Sun, Moon, Home, ShoppingCart, User, Heart } from "lucide-react";
import Logo from "@/assets/react.svg";
import { motion } from "framer-motion";
import { useLoadUserQuery, useLogoutUserMutation } from "@/redux/ApiController/authApi";
import { toast } from "sonner";
import Sidebar from "./Sidebar"; // ⬅️ Sidebar component
import { useSelector } from "react-redux";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useLoadUserQuery();
  const [logoutUser] = useLogoutUserMutation();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || "light";
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="py-1 fixed top-0 left-0 w-full bg-transparent  z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} className="h-8 w-8" alt="Logo" />
            <span className="text-sky-600 text-xl font-bold">Shadow Shop</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm lg:text-base">
            <Link to="/" className="hover:text-sky-600 text-gray-800 dark:text-white">
              <Home className="inline mr-1" size={18} /> Home
            </Link>
            <Link to="/cart" className="hover:text-sky-600 text-gray-800 dark:text-white relative">
              <ShoppingCart className="inline mr-1" size={18} /> Cart
              <h1 className=" absolute -top-5 -right-4 p-2 rounded-full text-yellow-500 font-bold">{cartItems.length || 0}</h1>
            </Link>

            <Link to="/like" className="hover:text-sky-600 text-gray-800 dark:text-white">
              <Heart className="inline mr-1" size={18} /> Like
            </Link>

            {isLoading ? (
              <p className="text-cyan-800 font-medium">Loading...</p>
            ) : !data?.user ? (
              <>
                <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                <Link to="/auth/signup" className="text-blue-600 font-medium hover:underline">Signup</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/account" className="hover:text-sky-600 text-gray-800 dark:text-white">
                  <User className="inline mr-1" size={18} /> Account
                </Link>
                <button onClick={handleLogout}>
                  <LogOut className="text-cyan-800 hover:text-rose-500" />
                </button>
              </div>
            )}

            <button onClick={toggleTheme} className="text-sky-600 hover:text-rose-500">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile theme only */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-sky-600 hover:text-rose-500">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <motion.nav
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-slate-800 shadow-inner py-2 px-6 flex justify-between items-center"
      >
        <Link to="/" className="flex flex-col items-center text-sky-600">
          <Home size={22} /> <span className="text-xs">Home</span>
        </Link>
        <Link to="/cart" className="text-sky-600 flex flex-col dark:text-white relative">
          <ShoppingCart className="inline mr-1" size={18} /> Cart
          <h1 className=" absolute -top-5 -right-2 p-2 rounded-full text-yellow-500 font-bold">{cartItems.length || 0}</h1>
        </Link>


             {isLoading ? (
              <p className="text-cyan-800 font-medium">Loading...</p>
            ) : !data?.user ? (
              <div className="flex flex-col justify-center items-center  text-sky-600">
                <User size={22} />
                <Link to="/auth/signup" className=" text-sky-600 font-medium ">Create</Link>
              </div>
            ) : (
              <div className="flex items-center gap-3  text-sky-600">
                <Link to="/account" className=" text-sky-600 ">
                  <User className="inline mr-1 text-sky-500" size={18} /> Account
                </Link>
              </div>
            )}

        <Link to='/like' className="flex flex-col items-center text-sky-600">
          <Heart size={22} /> <span className="text-xs">Like</span>
        </Link>
        <button onClick={() => setIsOpen(true)} className="flex flex-col items-center text-sky-600">
          <Menu size={22} /> <span className="text-xs">Menu</span>
        </button>
      </motion.nav>

      {/* Sidebar Sheet */}
      <Sidebar open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
