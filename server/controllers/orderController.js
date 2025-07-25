import { Order } from "../models/Order_mode.js";

// Create new order
import mongoose from 'mongoose';

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      shippingAddress,
      products,
      totalAmount,
      paymentMethod,
      isDhaka,
    } = req.body;

    if (!customerName || !phone || !shippingAddress || !Array.isArray(products) || !products.length || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert and validate product IDs
    const formattedProducts = products.map(p => {
      if (!mongoose.Types.ObjectId.isValid(p.productId)) {
        throw new Error(`Invalid productId: ${p.productId}`);
      }
      return {
        productId: new mongoose.Types.ObjectId(p.productId),
        quantity: p.quantity,
      };
    });

    const order = new Order({
      customerName,
      phone,
      shippingAddress,
      products: formattedProducts,
      totalAmount,
      user: req.id, // Make sure this comes from verified middleware
      isDhaka,
      paymentMethod: paymentMethod || "cash",
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name phone")
      .populate("products", "title price image");

    res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status or payment
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status) order.orderStatus = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updated = await order.save();
    res.json({ message: "Order updated", order: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
