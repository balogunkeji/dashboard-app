import { useProductStore } from "../hooks/useProductStore";

type ProductStatus = "pending" | "delivered" | "cancelled";
type ProductStatusCounts = {
  pending: number;
  delivered: number;
  cancelled: number;
};

export const fetchProducts = (page: number, pageSize: number) => {
  const { products } = useProductStore.getState();
  const start = (page - 1) * pageSize;
  return products.slice(start, start + pageSize);
};

export const countProducts = () => {
  const { products } = useProductStore.getState();
  return products.length;
};

export const productsByStatus = () => {
  const { products } = useProductStore.getState();
  return products.reduce<ProductStatusCounts>(
    (acc, product) => {
      const status = product.status as ProductStatus;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status] += 1;
      return acc;
    },
    { pending: 0, delivered: 0, cancelled: 0 }
  );
};
