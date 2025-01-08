import {create} from "zustand";
import { persist } from "zustand/middleware";

type Package = {
  name: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  quantityUnit: string;
};

type Product = {
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
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

export const useProductStore = create<ProductStore>()(
  persist<ProductStore>(
    (
      set: (partial: Partial<ProductStore> | ((state: ProductStore) => Partial<ProductStore>)) => void,
      get: () => ProductStore
    ) => ({
      products: [],
      addProduct: (product: Product) =>
        set({ products: [...get().products, product] }),
      updateProduct: (id: string, updatedProduct: Partial<Product>) =>
        set({
          products: get().products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        }),
      deleteProduct: (id: string) =>
        set({ products: get().products.filter((product) => product.id !== id) }),
    }),
    { name: "product-storage" }
  )
);
