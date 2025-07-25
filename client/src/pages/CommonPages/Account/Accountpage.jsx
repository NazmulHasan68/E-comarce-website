import React from "react";
import { LogOut, Settings, ShoppingBag, User } from "lucide-react";
import { useLoadUserQuery } from "@/redux/ApiController/authApi";
import { useGetOrderbyUserQuery } from "@/redux/ApiController/orderApi";
import { Link } from "react-router-dom";

export default function AccountPage() {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useLoadUserQuery();
  const userId = userData?.user?._id;

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrderbyUserQuery(userId, {
    skip: !userId,
  });

  if (userLoading)
    return <p className="text-center py-10">Loading user data...</p>;
  if (userError)
    return (
      <p className="text-center text-red-600 py-10">Error loading user info.</p>
    );

  if (ordersLoading)
    return <p className="text-center py-10">Loading orders...</p>;
  if (ordersError)
    return (
      <p className="text-center text-red-600 py-10">Error loading orders.</p>
    );

  return (
    <div className="bg-[var(--primary-bg-color)] ">
      <div className="max-w-5xl md:mx-auto mx-3 px-1 md:py-2 py-8 md:p-6">
        {/* Account Header */}
        <h1 className="md:text-3xl text-xl font-bold mb-6 flex items-center gap-3 text-[var(--primary-text-color)] pt-20">
          <User size={28} />
          Account Details
        </h1>

        {/* User Info */}
        <section className="mb-8 space-y-2 border-b border-gray-200 pb-6 p-4 bg-sky-400 text-[var(--primary-text-color)]">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {userData?.user?.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Phone:</span>{" "}
            {userData?.user?.phone || "Not provided"}
          </p>
        </section>

        {/* Orders Section */}
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-[var(--primary-text-color)]">
          <ShoppingBag size={22} />
          Your Orders
        </h2>

        {!orders || orders.length === 0 ? (
          <p className="text-center text-gray-600">
            You have not placed any orders yet.
          </p>
        ) : (
          <ul className="space-y-8 ">
            {orders.map((order) => (
              <li
                key={order._id}
                className={`capitalize font-semibold md:p-4 p-2 rounded-md bg-sky-50 shadow`}
              >
                <header className="flex justify-between items-center mb-4">
                  <p className="font-mono font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="text-indigo-600">
                      {order._id.slice(-8).toUpperCase()}
                    </span>
                  </p>
                  <span
                    className={`capitalize font-semibold px-3 py-1 rounded-full ${
                      order.orderStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.orderStatus === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Order details */}
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <strong>Total:</strong> ৳{order.totalAmount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Placed on:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Payment:</strong> {order.paymentMethod} (
                      <span className="capitalize">{order.paymentStatus}</span>)
                    </p>
                    <p>
                      <strong>Shipping Address:</strong> {order.shippingAddress}
                    </p>
                  </div>

                  {/* Right: Products List */}
                  <div>
                    <strong className="block mb-2 text-gray-800">
                      Products:
                    </strong>
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                      {order.products.map((item) => (
                        <li
                          key={item._id}
                          className="flex justify-between items-center bg-sky-100 p-2 rounded-md"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              ID: {item.productId}
                            </span>
                            <span className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <footer className="mt-4 text-sm text-gray-500">
                  Contact us - {" "}
                  <a
                    href="https://wa.me/8801842754421" // replace with your full phone number including country code, no plus signs or spaces
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Support :  +880 1842 754 421
                  </a>
                </footer>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
