import { useProductStore } from "../hooks/useProductStore";

type ProductStatus = "pending" | "delivered" | "cancelled";
type ProductStatusCounts = Record<ProductStatus, number>;

export const fetchProducts = (page: number, pageSize: number) => {
  const { products } = useProductStore.getState();
  const startIndex = (page - 1) * pageSize;
  return products.slice(startIndex, startIndex + pageSize);
};

export const countProducts = () => {
  return useProductStore.getState().products.length;
};

export const productsByStatus = () => {
  const { products } = useProductStore.getState();

  return products.reduce<ProductStatusCounts>(
    (counts, { status }) => {
      if (["pending", "delivered", "cancelled"].includes(status)) {
        counts[status as ProductStatus]++;
      } else {
        console.warn(`Invalid status found: ${status}`);
      }
      return counts;
    },
    { pending: 0, delivered: 0, cancelled: 0 }
  );
};
