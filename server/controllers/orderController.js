import { Order } from "../models/Order_mode.js";
import { User } from "../models/user.model.js";
import { Category } from "../models/category_mode.js";
import { Product } from "../models/product.model.js";
import { Band } from "../models/band_model.js"
import { Hero } from "../models/Hero_model.js";

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
    const order = await Order.findById(req.params.id).populate("user", "name phone");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrderByUser = async(req, res)=>{
  try {
    const order = await Order.find({user : req.params.id}).populate("user", "name phone").sort({ createdAt: -1 });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error dsfs" });
  }
}

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



export const dashboardDetails = async (req, res) => {
  console.log("📊 Dashboard Details");

  try {
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOf7DaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const startOf1MonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const startOf3MonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    const startOf6MonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    const startOf1YearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Counts
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments({ orderStatus: "completed" });
    const Orders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalBrands = await Band.countDocuments();
    const Products = await Product.find();
    const totalProducts = await Product.countDocuments();
    const totalHeros = await Hero.countDocuments();

    // Helper function to calculate income
    const calculateIncome = async (startDate) => {
      const result = await Order.aggregate([
        {
          $match: {
            orderStatus: "completed",
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: null,
            totalIncome: { $sum: "$totalAmount" }
          }
        }
      ]);
      return result[0]?.totalIncome || 0;
    };

    // Income calculations
    const todayIncome = await calculateIncome(startOfToday);
    const last7DaysIncome = await calculateIncome(startOf7DaysAgo);
    const last1MonthIncome = await calculateIncome(startOf1MonthAgo);
    const last3MonthsIncome = await calculateIncome(startOf3MonthsAgo);
    const last6MonthsIncome = await calculateIncome(startOf6MonthsAgo);
    const last1YearIncome = await calculateIncome(startOf1YearAgo);
    const totalIncome = await calculateIncome(new Date(0)); // all-time

    // Orders count by range
    const todaysOrders = await Order.countDocuments({
      orderStatus: "completed",
      createdAt: { $gte: startOfToday },
    });

    const last7DaysOrders = await Order.countDocuments({
      orderStatus: "completed",
      createdAt: { $gte: startOf7DaysAgo },
    });

    const last1MonthOrders = await Order.countDocuments({
      orderStatus: "completed",
      createdAt: { $gte: startOf1MonthAgo },
    });

    const last3MonthsOrders = await Order.countDocuments({
      orderStatus: "completed",
      createdAt: { $gte: startOf3MonthsAgo },
    });

    const last6MonthsOrders = await Order.countDocuments({
      orderStatus: "completed",
      createdAt: { $gte: startOf6MonthsAgo },
    });

    const last1YearOrders = await Order.countDocuments({
      orderStatus: "completed",
      createdAt: { $gte: startOf1YearAgo },
    });

    res.json({
      totalUsers,
      totalOrders,
      Orders,
      totalCategories,
      totalBrands,
      totalProducts,
      totalHeros,
      todaysOrders,
      last7DaysOrders,
      last1MonthOrders,
      last3MonthsOrders,
      last6MonthsOrders,
      last1YearOrders,
      todayIncome,
      last7DaysIncome,
      last1MonthIncome,
      last3MonthsIncome,
      Products,
      last6MonthsIncome,
      last1YearIncome,
      totalIncome,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error in dashboardDetails" });
  }
};
