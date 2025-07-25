import React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function AdminCommonDesign({
  title,
  searchValue,
  onSearchChange,
  currentPage,
  onPageChange,
  isLoading,
  filteredData,
}) {
  if (isLoading) return <div>Loading...</div>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tableHeaders = [
    "Customer",
    "Phone",
    "Shipping",
    "Payment",
    "Total",
    "Action",
    "Created",
  ];

  // Create rows here based on paginatedData
  const tableRows = paginatedData.map((order) => (
    <TableRow key={order._id} className=" text-[var(--primary-text-color)]">
      <TableCell>{order.customerName}</TableCell>
      <TableCell>{order.phone}</TableCell>
      <TableCell>{order.shippingAddress}</TableCell>
      <TableCell>{order.paymentMethod}</TableCell>
      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
      <TableCell>
        <Link
          to={`/control/product_details/${order._id}`}
          className="hover:underline hover:font-bold"
        >
          View
        </Link>
      </TableCell>
      <TableCell>
        {new Date(order.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="md:p-4 p-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl  font-bold mb-4 text-[var(--primary-text-color)]">{title}</h2>

        <Input
          placeholder="Search by name or phone..."
          value={searchValue}
          onChange={onSearchChange}
          style={{ boxShadow: "inset 0 3px 4px rgba(0, 0, 0, 0.06)" }}
          className="mb-4 max-w-md outline-2 outline-sky-300 border border-sky-500 rounded-xl bg-slate-50 pl-4 shadow-inner"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-blue-500 hover:bg-blue-500 text-white">
            {tableHeaders.map((header, idx) => (
              <TableCell key={idx}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
