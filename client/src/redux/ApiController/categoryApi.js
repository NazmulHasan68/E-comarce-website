import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/categories`,
    credentials: "include",
  }),
  tagTypes: ["Category"], // 👈 Add tag type
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/",
      providesTags: ["Category"], // 👈 Provide tag
    }),
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"], // 👈 Invalidate tag to refresh data
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"], // 👈 Invalidate tag to refresh data
    }),
  }),
});

// Export hooks
export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
