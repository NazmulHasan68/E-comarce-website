import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/features/cartSlice";
import { Link } from "react-router-dom";

export default function Cartpage() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();

  const [shippingLocation, setShippingLocation] = useState("inside");

  const shippingCost = shippingLocation === "inside" ? 80 : 120;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="min-h-screen mt-16 bg-[var(--primary-bg-color)] p-4 md:p-8">
      <div className="max-w-6xl md:mx-auto mx-2">
        <h1 className="md:text-2xl text-xl font-semibold mb-4 md:mb-6 text-[var(--primary-text-color)]">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 mt-20">
            <p className="text-lg">Your cart is currently empty 🛒</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between gap-4 bg-[var(--secondary-bg-color)] shadow p-2 rounded-lg"
                >
                  <div className="flex items-center gap-4 basis-3/5">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div>
                      <Link
                        to={`/product_details/${item.id}`}
                        className="text-lg hover:underline font-medium text-[var(--primary-text-color)] line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        ৳{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 basis-1/5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(decrementQuantity(item))}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(incrementQuantity(item))}
                    >
                      +
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 basis-1/5">
                    <span className="text-base font-medium text-[var(--primary-text-color)]">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(item)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-[var(--secondary-bg-color)] p-4 rounded-lg shadow-lg h-fit sticky top-16 md:top-20">
              <h2 className="md:text-xl text-md font-semibold text-[var(--primary-text-color)] mb-4">
                Order Summary
              </h2>

              {/* Location Selector */}
              <div className="mb-4 text-sm text-[var(--primary-text-color)]">
                <label className="block mb-1 font-medium">Delivery Location:</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value="inside"
                      checked={shippingLocation === "inside"}
                      onChange={() => setShippingLocation("inside")}
                    />
                    Inside Dhaka (৳80)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value="outside"
                      checked={shippingLocation === "outside"}
                      onChange={() => setShippingLocation("outside")}
                    />
                    Outside Dhaka (৳120)
                  </label>
                </div>
              </div>

              <div className="flex justify-between mb-2 text-[var(--primary-text-color)]">
                <span>Subtotal</span>
                <span>৳{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-[var(--primary-text-color)]">
                <span>Shipping</span>
                <span>৳{shippingCost}</span>
              </div>
              <hr className="text-[var(--primary-text-color)] mb-4" />
              <div className="flex justify-between font-bold text-lg text-[var(--primary-text-color)]">
                <span>Total</span>
                <span>৳{(totalAmount + shippingCost).toFixed(2)}</span>
              </div>
              <Button
                className="mt-6 w-full bg-sky-600 text-white hover:bg-sky-700"
                onClick={() => alert("Checkout functionality not implemented")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
