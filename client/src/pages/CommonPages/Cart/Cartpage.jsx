import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import empty from "@/assets/empty.png";
import { toast } from "sonner";
import { useCreateOrderMutation } from "@/redux/ApiController/orderApi";
import { useLoadUserQuery } from "@/redux/ApiController/authApi";

export default function CartPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const { data } = useLoadUserQuery();
  const [showDialog, setShowDialog] = useState(false);

  const [shippingLocation, setShippingLocation] = useState("inside");
  const shippingCost = shippingLocation === "inside" ? 80 : 120;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleOrder = () => {
    if (data?.user) {
      setShowDialog(true);
      console.log("hi");
      
    } else {
      navigate("/auth/login");
      toast.info("Please login or create an account!");
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-[var(--primary-bg-color)] p-2 md:p-8">
      <div className="max-w-6xl md:mx-auto mx-2">
        <h1 className="md:text-2xl text-xl font-semibold mb-4 md:mb-6 text-[var(--primary-text-color)]">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="max-w-4xl mx-auto text-gray-600 py-16 mt-20 text-center">
            <img src={empty} className="w-40 mx-auto mb-4 object-cover" />
            <p>Your cart is empty. Add some products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between gap-4 bg-[var(--secondary-bg-color)] shadow p-2 rounded-lg relative"
                >
                  <div className="flex items-center gap-4 md:basis-3/5 basis-3/4">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="md:w-20 w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <Link
                        to={`/product_details/${item.id}`}
                        className="md:text-lg text-sm hover:underline font-medium text-[var(--primary-text-color)] line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="md:text-sm text-xs text-gray-500">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-gray-600 text-xs">
                        ৳{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(decrementQuantity(item))}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(incrementQuantity(item))}
                    >
                      +
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--primary-text-color)]">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(item)}
                      className="bg-sky-100"
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
              <hr className="mb-4" />
              <div className="flex justify-between font-bold text-lg text-[var(--primary-text-color)]">
                <span>Total</span>
                <span>৳{(totalAmount + shippingCost).toFixed(2)}</span>
              </div>
              <Button
                className="mt-6 w-full bg-sky-600 text-white hover:bg-sky-700"
                onClick={()=>handleOrder()}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>

      <OrderDetailsDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        cartItems={cartItems}
        totalAmount={totalAmount}
        shippingCost={shippingCost}
      />
    </div>
  );
}

function OrderDetailsDialog({ open, onClose, cartItems, totalAmount, shippingCost }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isDhaka, setisDhaka] = useState(false)
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!customerName || !phone || !shippingAddress) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      customerName,
      phone,
      shippingAddress,
      paymentMethod,
      isDhaka,
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      totalAmount: totalAmount + shippingCost,
    };

    try {
      await createOrder(payload).unwrap();
      toast.success("Order placed successfully!");
      dispatch({ type: "cart/clearCart" });
      onClose();
      navigate("/account");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full border px-3 py-2 rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder="Shipping Address"
            className="w-full border px-3 py-2 rounded"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />

          <div className="flex justify-between items-center">

            <div>
              <label className="block text-sm font-medium mb-1">In side Dhaka</label>
              <select
                value={isDhaka}
                onChange={(e) => setisDhaka(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="true">Yes</option>
                <option value="flase">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="cash">Cash on Delivery</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>

        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
