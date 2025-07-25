import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  createOrder,
  dashboardDetails,
  getOrderByUser,
} from "../controllers/orderController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.get("/dashboard", dashboardDetails);
router.get("/user/:id", isAuthenticated, getOrderByUser)      
router.post("/create", isAuthenticated, createOrder);        
router.get("/", isAuthenticated, getAllOrders);         
router.get("/:id", isAuthenticated, getOrderById); 
router.delete("/:id", isAuthenticated, deleteOrder);  
router.put("/:id", isAuthenticated, updateOrderStatus); 

export default router;
