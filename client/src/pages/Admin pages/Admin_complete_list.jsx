
import React, { useState } from "react";
import { useGetAllOrdersQuery } from "@/redux/ApiController/orderApi";
import AdminCommonDesign from "@/components/Common/AdminCommonDesign";

export default function Admin_complete_list() {
  const { data: allOrders = [], isLoading } = useGetAllOrdersQuery();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter pending orders and apply search
  const filteredPendingOrders = allOrders.filter(
    (order) =>
      order.orderStatus === "completed" &&
      (order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.phone.includes(search))
  );

  return (
    <AdminCommonDesign
      title="CompletedOrders"
      searchValue={search}
      onSearchChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      filteredData={filteredPendingOrders}
      currentPage={page}
      onPageChange={setPage}
      isLoading={isLoading}
    />
  );
}
