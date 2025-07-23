import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/categories`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/",
    }),
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData, // expects FormData with 'category' and 'icon' fields
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
