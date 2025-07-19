// ✅ Reusable custom hook
import { products } from "@/components/Common/data";

const useCategoryProducts = (categoryName) => {
  return products.filter(
    (product) =>
      product.category?.toLowerCase().trim() === categoryName.toLowerCase().trim()
  );
};

export default useCategoryProducts;

