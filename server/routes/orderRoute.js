import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  createOrder,
} from "../controllers/orderController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.post("/create", isAuthenticated, createOrder);        
router.get("/", isAuthenticated, getAllOrders);         
router.get("/:id", isAuthenticated, getOrderById);       
router.put("/:id", isAuthenticated, updateOrderStatus); 
router.delete("/:id", isAuthenticated, deleteOrder);  

export default router;
