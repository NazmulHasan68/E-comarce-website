import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const cartItems = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 650,
    quantity: 2,
    image: "https://via.placeholder.com/80x80.png?text=T-Shirt",
  },
  {
    id: 2,
    name: "Winter Hoodie",
    price: 1200,
    quantity: 1,
    image: "https://via.placeholder.com/80x80.png?text=Hoodie",
  },
];

export default function Cartpage() {
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/90 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 mt-20">
          <p className="text-lg">Your cart is currently empty 🛒</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 shadow p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      ৳{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    ৳{item.price * item.quantity}
                  </span>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg h-fit sticky top-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
              <span>Subtotal</span>
              <span>৳{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
              <span>Shipping</span>
              <span>৳60</span>
            </div>
            <hr className="border-gray-300 dark:border-gray-700 mb-4" />
            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
              <span>Total</span>
              <span>৳{totalAmount + 60}</span>
            </div>
            <Button className="mt-6 w-full bg-sky-600 text-white hover:bg-sky-700">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
