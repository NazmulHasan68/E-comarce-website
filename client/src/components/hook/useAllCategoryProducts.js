// utils/getAllCategoryProducts.js
import { category, products } from "@/components/Common/data";

export const getAllCategoryProducts = () => {
  return category.map((cat) => ({
    category: cat,
    products: products.filter(
      (p) =>
        p.category?.toLowerCase().trim() === cat.toLowerCase().trim()
    ),
  }));
};
