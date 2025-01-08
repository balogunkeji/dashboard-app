'use client';
import ProductForm from "@/components/Dashboard/Form";
import ProductTable from "@/components/Dashboard/ProductTable";
import SummaryBox from "@/components/Dashboard/SummaryBox";
import React, { useState } from "react";


const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditProduct = (product: any) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4 pt-20 flex flex-col justify-center">
      <SummaryBox />
      <div className="mt-6 flex justify-center flex-col">
        <button onClick={handleAddProduct} className="btn mb-4">
          Add Product
        </button>
        <ProductTable onEditProduct={handleEditProduct} />
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <ProductForm
            onClose={() => setIsFormOpen(false)}
            productToEdit={productToEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
