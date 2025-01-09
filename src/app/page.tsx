'use client';
import ProductForm from "@/components/Dashboard/Form";
import ProductTable from "@/components/Dashboard/ProductTable";
import SummaryBox from "@/components/Dashboard/SummaryBox";
import Loader from "@/components/Shared/Loader";
import { Product, useProductStore } from "@/hooks/useProductStore";
import React, { useState } from "react";

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
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

if(isLoading) {
  return (
    <Loader/>
  )
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
        <div className="px-[5%] lg:p-4 my-24 flex flex-col  w-full gap-6 h-screen no-scrollbar">
          <SummaryBox />
          <div className="mt-6 flex justify-center flex-col items-center w-full mx-auto">
          <button 
            onClick={handleAddProduct} 
            className="btn w-[200px] mb-6 rounded-[8px] h-[50px] text-[#fff] bg-[#A05AFF]"
          >
            Add Product
          </button>
            <ProductTable onEditProduct={handleEditProduct} />
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
