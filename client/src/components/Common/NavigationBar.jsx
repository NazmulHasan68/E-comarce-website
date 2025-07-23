import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu, X, LogOut, Sun, Moon, Home,
  ShoppingCart, User, Heart
} from "lucide-react";
import Logo from "@/assets/logwith.png";
import { motion } from "framer-motion";
import {
  useLoadUserQuery,
  useLogoutUserMutation,
} from "@/redux/ApiController/authApi";
import { toast } from "sonner";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import {
  DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useLoadUserQuery();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout successful!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Top Nav */}
      <nav className="py-1 fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} className="md:h-12 h-10 md:w-40 w-32 object-cover" alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm lg:text-base">
            <Link to="/" className="hover:text-sky-600 text-blue-600 dark:text-white">
              <Home className="inline mr-1" size={18} /> Home
            </Link>

            <Link to="/cart" className="relative hover:text-sky-600 text-blue-600 dark:text-white">
              <ShoppingCart className="inline mr-1" size={18} /> Cart
              <span className="absolute -top-3 -right-4 text-yellow-500 font-bold">
                {cartItems.length}
              </span>
            </Link>

            <Link to="/like" className="hover:text-sky-600 text-blue-600 dark:text-white">
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Link to="/account" className="text-blue-600 hover:text-sky-800 dark:text-white">
                      <User className="inline mr-1" size={18} /> Account
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 bg-sky-50">
                    <DropdownMenuLabel className="text-sky-600 font-bold bg-slate-100 rounded-md">
                      {data?.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/account" className="text-sky-700 hover:text-rose-500">
                        Account
                      </Link>
                    </DropdownMenuItem>
                    {data?.user?.role === "admin" && (
                      <DropdownMenuItem>
                        <Link to="/control" className="text-sky-700 hover:text-rose-500">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <button onClick={handleLogout}>
                  <LogOut className="text-blue-800 hover:text-rose-500" />
                </button>
              </div>
            )}

            <button onClick={toggleTheme} className="text-sky-600 hover:text-rose-500">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Theme Toggle */}
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
        transition={{ duration: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-slate-800 shadow-inner py-2 px-6 flex justify-between items-center"
      >
        <Link to="/" className="flex flex-col items-center text-sky-600">
          <Home size={22} />
          <span className="text-xs">Home</span>
        </Link>

        <Link to="/cart" className="flex flex-col items-center text-sky-600 relative">
          <ShoppingCart size={22} />
          <span className="absolute -top-2 -right-3 text-yellow-500 font-bold text-xs">
            {cartItems.length}
          </span>
          <span className="text-xs">Cart</span>
        </Link>

        {isLoading ? (
          <p className="text-xs text-cyan-800">Loading...</p>
        ) : !data?.user ? (
          <Link to="/auth/signup" className="flex flex-col items-center text-sky-600">
            <User size={22} />
            <span className="text-xs">Create</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none flex justify-center items-center flex-col">
              <User className="text-sky-600" size={32} />
              <span className="text-xs text-sky-600">Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 bg-sky-50">
              <DropdownMenuLabel className="text-sky-600 font-bold">
                {data?.user?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/account" className="text-sky-700 hover:text-rose-500">
                  Account
                </Link>
              </DropdownMenuItem>
              {data?.user?.role === "admin" && (
                <DropdownMenuItem>
                  <Link to="/control" className="text-sky-700 hover:text-rose-500">
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
             
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Link to="/like" className="flex flex-col items-center text-sky-600">
          <Heart size={22} />
          <span className="text-xs">Like</span>
        </Link>

        <button onClick={() => setIsOpen(true)} className="flex flex-col items-center text-sky-600">
          <Menu size={22} />
          <span className="text-xs">Menu</span>
        </button>
      </motion.nav>

      {/* Sidebar */}
      <Sidebar open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
