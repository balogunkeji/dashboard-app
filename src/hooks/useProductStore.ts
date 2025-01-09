import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Package = {
  name: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  quantityUnit: string;
};

export type Product = {
  id: string;
  title: string;
  recipient: string;
  recipientPhone: string;
  description: string;
  origin: string;
  destination: string;
  eta: number;
  status: string;
  packages: Package[];
};

type ProductStore = {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setLoading: (loading: boolean) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      addProduct: (product: Product) => {
        set((state) => {
          const updatedProducts = [...state.products, product];
          return { products: updatedProducts };
        });
      },
      updateProduct: (id: string, updatedProduct: Partial<Product>) => {
        set((state) => {
          const updatedProducts = state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          );
          return { products: updatedProducts };
        });
      },
      deleteProduct: (id: string) => {
        set((state) => {
          const updatedProducts = state.products.filter((product) => product.id !== id);
          return { products: updatedProducts };
        });
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "product-storage", 
    }
  )
);
