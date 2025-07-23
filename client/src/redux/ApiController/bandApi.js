import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const bandApi = createApi({
  reducerPath: "bandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/band`,
    credentials: "include",
  }),
  tagTypes: ["Bands"], // 👈 define tag type
  endpoints: (builder) => ({
    getBands: builder.query({
      query: () => "/",
      providesTags: ["Bands"], // 👈 cache tag provided
    }),
    addBand: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Bands"], // 👈 invalidate on add
    }),
    deleteBand: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bands"], // 👈 invalidate on delete
    }),
  }),
});

// Export hooks
export const {
  useGetBandsQuery,
  useAddBandMutation,
  useDeleteBandMutation,
} = bandApi;
