import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useForgotPasswordCodeMutation } from "@/redux/ApiController/authApi"; 

export default function ForgotPasswordCode() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const [verifyOtp, { data, isLoading, error }] = useForgotPasswordCodeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      toast.error("OTP must be exactly 6 digits.");
      return;
    }

    try {
      const response = await verifyOtp({ otp: code }).unwrap();

      
      if (response?.success) {
        toast.success("OTP Verified Successfully! Redirecting...");
        navigate("/auth/reset-password");
      } else {
        toast.error(response?.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-50 text-gray-800 p-6 mx-4 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-sky-900 mb-4">Forgot Password Verify Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sky-700">Enter OTP</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/, ""))} // Only numbers allowed
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              inputMode="numeric"
              pattern="\d{6}" // Ensures 6-digit OTP
              maxLength={6} // Prevents extra input
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-sky-500 hover:bg-sky-600 mt-4">
            {isLoading ? <Loader className="animate-spin mx-auto" /> : "Verify"}
          </Button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error?.data?.message || "Something went wrong"}</p>}
      </motion.div>
    </div>
  );
}
