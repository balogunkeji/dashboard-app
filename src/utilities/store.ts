import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PackageRequest {
  name: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  quantityUnit: string;
}

interface Product {
  id: string;
  title: string;
  status: 'pending' | 'delivered' | 'cancelled'; // Restrict the status to only these values
  description: string;
  recipient: string;
  recipientPhone: string;
  origin: string;
  destination: string;
  eta: number;
  packages: PackageRequest[];
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  countProducts: () => number;
  productsByStatus: () => { pending: number; delivered: number; cancelled: number };
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((prod) =>
            prod.id === id ? { ...prod, ...updatedProduct } : prod
          ),
        })),
      deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
      countProducts: () => {
        const state = get();
        return state.products.length;
      },
      productsByStatus: () => {
        const state = get();
        const statusCount: { pending: number; delivered: number; cancelled: number } = {
          pending: 0,
          delivered: 0,
          cancelled: 0,
        };

        state.products.forEach((p) => {
          if (p.status in statusCount) {
            statusCount[p.status]++;
          }
        });

        return statusCount;
      },
    }),
    { name: 'product-storage' }
  )
);
