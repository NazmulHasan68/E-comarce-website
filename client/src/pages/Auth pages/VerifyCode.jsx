import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useVerifyOtpMutation } from "@/redux/ApiController/authApi";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setCustomError("OTP must be 6 digits.");
      return;
    }

    try {
      const res = await verifyOtp({ otp: code }).unwrap();
      toast.success(res.message || "Verify token successfully!");
      setCustomError("");
      navigate("/");

      // Optional: reload page if needed
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Verification error:", err);
      setCustomError(err?.data?.message || "Failed to verify OTP.");
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
        <h2 className="text-2xl font-bold text-center text-sky-900 mb-4">Verification Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sky-700">Enter OTP</label>
            <input
              id="code"
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>

          {customError && <p className="text-xs text-rose-500 mt-1">{customError}</p>}

          <Button type="submit" disabled={isLoading} className="w-full bg-sky-500 hover:bg-sky-600 mt-4">
            {isLoading ? <Loader className="animate-spin mx-auto" /> : "Verify"}
          </Button>
        </form>

        <div className="mt-4 text-left">
          <Link to="/forgot-password" className="text-sky-500 hover:text-sky-600">
            Resend OTP
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
