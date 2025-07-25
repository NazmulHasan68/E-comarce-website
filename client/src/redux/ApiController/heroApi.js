import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/hero`,
    credentials: "include",
  }),
  tagTypes: ["heros"], // 👈 define tag type
  endpoints: (builder) => ({
    getheros: builder.query({
      query: () => "/",
      providesTags: ["heros"], // 👈 cache tag provided
    }),
    addhero: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["heros"], // 👈 invalidate on add
    }),
    deletehero: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["heros"], // 👈 invalidate on delete
    }),
  }),
});

// Export hooks
export const {
  useGetherosQuery,
  useAddheroMutation,
  useDeleteheroMutation
} = heroApi;
