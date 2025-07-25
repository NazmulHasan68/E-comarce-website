import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/ApiController/orderApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "sonner";

export default function Admin_p_status_view() {
  const { orderId } = useParams();
  const navigate = useNavigate()

  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [newStatus, setNewStatus] = useState("");

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!order) return <p className="text-center text-red-500">Order not found</p>;

  const {
    _id,
    customerName,
    phone,
    shippingAddress,
    totalAmount,
    paymentMethod,
    isDhaka,
    paymentStatus,
    orderStatus,
    createdAt,
    products,
    user,
  } = order;

  const handleStatusChange = async (status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      setNewStatus(status);
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(orderId);
      toast.success("Order deleted");
    }
  };

  return (
    <div>
      <div className="flex gap-2 text-rose-500 mx-4 py-4 cursor-pointer hover:font-bold" onClick={()=>navigate(-1)}>
        <ArrowLeft/> Back To prvious page
      </div>
      <Card className="w-full max-w-4xl mx-auto rounded-xl border-none bg-[var(--secondary-bg-color)]">
        
        <CardHeader className="bg-sky-400">
          <CardTitle className="text-xl flex justify-between items-center text-white">
            <span>🧾 Order ID: {_id.slice(-6).toUpperCase()}</span>
            <Badge variant="outline" className="text-xs capitalize bg-white px-3 py-1 rounded-xl text-black">
              {newStatus || orderStatus}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-2 py-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>
                {shippingAddress} ({isDhaka ? "Dhaka" : "Outside Dhaka"})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span>Total: ৳{totalAmount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span className="capitalize">
                Payment: {paymentMethod}{" "}
                <span className="text-sky-600 font-medium">({paymentStatus})</span>
              </span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{new Date(createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Status & Delete */}
          <div className="flex justify-between items-center bg-sky-400 py-3 px-4 rounded-xl">
            <Select onValueChange={handleStatusChange} defaultValue={orderStatus}>
              <SelectTrigger className="w-[200px] bg-white border rounded-full text-sm">
                <SelectValue placeholder="Change Order Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-100">
                {["pending", "processing", "shipped", "completed", "cancelled"].map(
                  (status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              onClick={handleDelete}
              className="rounded-xl px-4 bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>

          {/* Product Table */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Products</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <img
                        src={item?.images?.[0] || "/placeholder.jpg"}
                        alt="Product"
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <code className="text-xs">{item.productId}</code>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>৳{item.price?.toFixed(2) || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* User Info */}
          {user && (
            <div className="bg-sky-300 p-3 rounded-xl">
              <h3 className="font-semibold text-lg mb-1">User Details</h3>
              <div className="text-sm space-y-1 text-gray-800">
                <p>Name: {user.name}</p>
                <p>Phone: {user.phone}</p>
                <p>
                  User ID: <code>{user._id}</code>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
