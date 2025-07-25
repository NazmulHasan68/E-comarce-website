import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/create",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // Get all orders
    getAllOrders: builder.query({
      query: () => `/`,
      providesTags: ["Order"],
    }),

    // Get order by ID
    getOrderById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    getOrderbyUser : builder.query({
      query : (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Update order status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/${orderId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order" },
      ],
    }),

    // Delete order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

   getdashboard: builder.query({ query: () => `/dashboard` })
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderbyUserQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetdashboardQuery
} = orderApi;
