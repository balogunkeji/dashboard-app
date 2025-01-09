"use client";
import ProductForm from "@/components/Dashboard/Form";
import ProductTable from "@/components/Dashboard/ProductTable";
import SummaryBox from "@/components/Dashboard/SummaryBox";
import Loader from "@/components/Shared/Loader";
import { Product, useProductStore } from "@/hooks/useProductStore";
import React, { useState, useMemo } from "react";

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const { products, isLoading } = useProductStore();
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const filteredProducts = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return products.filter((product) => {
      const idMatch = product.id.toString().toLowerCase().includes(searchTermLower);
      const titleMatch = product.title.toLowerCase().includes(searchTermLower);
      const descriptionMatch = product.description.toLowerCase().includes(searchTermLower);
      const statusMatch = product.status.toLowerCase().includes(searchTermLower);
      const etaMatch = new Date(product.eta * 1000).toLocaleString().toLowerCase().includes(searchTermLower);
      
      return titleMatch || idMatch || etaMatch || statusMatch || descriptionMatch;
    });
  }, [searchTerm, products]);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {products.length === 0 ? (
        <div className="m-auto my-[400px] flex flex-col justify-center w-full items-center">
          <button
            onClick={handleAddProduct}
            className="btn mb-4 w-[200px] rounded-[8px] h-[50px] text-[#fff] bg-[#A05AFF]"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="px-[5%] lg:p-4 my-24 flex flex-col w-full gap-6 h-screen no-scrollbar">
          <SummaryBox />
          <div className="mt-6 flex flex-col items-center w-full">
            {/* Search input */}
            <div className="flex items-center justify-center w-full gap-10">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg mb-6 px-4 py-2 rounded-lg border border-[#f5f5f5] focus:ring-2 focus:ring-[#A05AFF] focus:outline-none"
            />
            <button
              onClick={handleAddProduct}
              className="btn w-[200px] mb-6 rounded-[8px] h-[50px] text-[#fff] bg-[#A05AFF]"
            >
              Add Product
            </button>
            </div>
            <ProductTable products={filteredProducts} onEditProduct={handleEditProduct} />
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <ProductForm
            onClose={() => setIsFormOpen(false)}
            existingProduct={productToEdit}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
