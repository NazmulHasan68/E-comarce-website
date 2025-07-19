import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut } from "lucide-react";
import Logo from  "@/assets/react.svg";
import { motion } from "framer-motion";
import { useLoadUserQuery, useLogoutUserMutation } from "@/redux/ApiController/authApi";
import { toast } from "sonner";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useLoadUserQuery();
  const [logoutUser] = useLogoutUserMutation();

  const searchHandler = (e) =>{
    e.preventDefault();

   
    navigate(`/search?query=${searchQuery}`)
    
    setSearchQuery("")
  }


  const handleLogout = async () => {
    try {
      await logoutUser();  
      toast.success("Logout successfully!")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav className="py-1 fixed shadow-lg top-0 left-0 w-full bg-slate-50 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to={"/"} className="text-xl font-bold flex items-center">
            <img src={Logo} className="h-14 md:h-16 object-cover" alt="Logo" />
            <p className="text-sky-600 text-xl font-bold md:text-lg lg:text-2xl">BD Educators</p>
          </Link>


          {/* Navigation Links (Desktop) */}
          <div className="hidden text-xl md:text-sm lg:text-xl md:flex space-x-6 items-center">
            <Link to="/book" className="hover:text-rose-600 text-cyan-800 font-medium">Books & Exam</Link>
            <Link to="/ask" className="hover:text-rose-600 text-cyan-800 font-medium">Q/A</Link>
            <Link to="/about" className="hover:text-rose-600 text-cyan-800 font-medium">About</Link>

            {isLoading ? (
              <p className="text-cyan-800 font-medium">Loading...</p>
            ) : !data?.user ? (
              <>
                <Link to="/auth/login" className="hover:text-rose-500 text-rose-600 font-medium">Login</Link>
                <Link to="/auth/signup" className="hover:text-rose-500 text-rose-600 font-medium">Signup</Link>
              </>
            ) : (
              <div className="flex gap-4 items-center">

                <DropdownMenu>
                  <DropdownMenuTrigger className=" outline-none">
                    <img
                      src={data.user.photoUrl}
                      className="w-10 h-10 rounded-full border hover:border-rose-500"
                      alt="User Profile"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2">
                    <DropdownMenuLabel className="text-sky-600 font-bold  bg-slate-100 rounded-md">{data?.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to={'/my/learning'} className="text-sky-700 hover:text-rose-500">
                        My Learing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={'/my/profile'} className="text-sky-700 hover:text-rose-500">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    {
                      data?.user.role == 'instructor' ? (
                        <DropdownMenuItem>
                          <Link to={'admin-panel-my-course/course'} className="text-sky-700 hover:text-rose-500">
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                  </DropdownMenuContent>
                </DropdownMenu>


                <button onClick={handleLogout}>
                  <LogOut className="text-cyan-800 hover:text-rose-500 cursor-pointer" />
                </button>
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="mt-4 underline text-sm">
            Toggle Theme
          </button>

          {/* Mobile Menu Button */}
          <div className=" flex items-center gap-2 md:hidden">
            {data?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger className=" outline-none">
                  <img
                    src={data?.user.photoUrl}
                    className="w-10 h-10 rounded-full border hover:border-rose-500"
                    alt="User Profile"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <DropdownMenuLabel className="text-sky-600 font-bold bg-slate-100 rounded-md">{data?.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={'/my/learning'} className="text-sky-700 hover:text-rose-500">
                      My Learing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={'/my/profile'} className="text-sky-700 hover:text-rose-500">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                    {
                      data?.user.role == 'instructor' ? (
                        <DropdownMenuItem>
                          <Link to={'admin-panel-my-course/course'} className="text-sky-700 hover:text-rose-500">
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      ) : null
                    }
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="font-bold text-rose-600" size={30} /> : <Menu className="font-bold" size={30} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed top-14 left-0 w-full z-50 bg-slate-50 shadow-md p-4 flex flex-col items-center mt-4 space-y-4"
        >
          <Link to="/book" className="hover:text-rose-500 text-cyan-800 font-medium" onClick={() => setIsOpen(false)}>Books and Exam</Link>
          <Link to="/ask" className="hover:text-rose-500 text-cyan-800 font-medium" onClick={() => setIsOpen(false)}>Q/A</Link>
          <Link to="/about" className="hover:text-rose-500 text-cyan-800 font-medium" onClick={() => setIsOpen(false)}>About</Link>

          {isLoading ? (
            <p className="text-cyan-800 font-medium">Loading...</p>
          ) : !data?.user ? (
            <>
              <Link to="/auth/login" className="hover:text-rose-500 text-rose-600 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/auth/signup" className="hover:text-rose-500 text-rose-600 font-medium" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button onClick={handleLogout} className="flex items-center gap-2 font-medium text-cyan-800 hover:text-rose-500 cursor-pointer">
                <p>Logout</p>
                <LogOut />
              </button>
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
            <Search className="text-gray-500" size={20} />
            <input type="text" placeholder="Search..." className="ml-2 outline-none bg-transparent w-52 md:w-48 lg:w-72" />
          </div>
        </motion.nav>
      )}
    </>
  );
}
