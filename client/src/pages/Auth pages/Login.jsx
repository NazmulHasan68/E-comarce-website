import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import LoginImage from  "@/assets/loginn.png";
import { useLoginUserMutation } from "@/redux/ApiController/authApi";
import { toast } from "sonner";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      phone: phone,
      password: password,
    };

    try {
      await loginUser(formData).unwrap();
      toast.success("Login successful! 🎉");
      navigate("/"); 
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--primary-bg-color)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
        className="bg-[var(--secondary-bg-color)] text-gray-800 p-6 rounded-lg shadow-md mx-4 w-full max-w-3xl flex-col md:flex-row flex justify-between items-center gap-2"
      >
        <div className="basis-1/2 hidden md:block">
          <img src={LoginImage} className="w-full h-full object-cover" />
        </div>
        <div className="basis-1/2 w-full">
          <h2 className="text-2xl font-bold text-center text-sky-500">Login</h2>
          <h2 className="text-sm font-medium text-center text-sky-600 mb-4">Activate your account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone" className="block text-gray-700 mb-1">Phone</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[var(--tertiary-bg-color)] dark:text-gray-50 text-gray-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-gray-700 mb-1">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--tertiary-bg-color)] dark:text-gray-50 text-gray-600"
                required
              />
            </div>

            <div className="flex justify-between">
              <Link to="/auth/forgot-password" className="hover:underline font-medium text-gray-700">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 mt-2" disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin mx-auto" /> : "Login"}
            </Button>

            {error && (
              <p className="text-red-500 text-xs text-center mt-2">
                {error.data?.message || "An error occurred. Please try again."}
              </p>
            )}
          </form>

          <p className="text-center text-gray-700 mt-4">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-sky-500 font-medium">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
