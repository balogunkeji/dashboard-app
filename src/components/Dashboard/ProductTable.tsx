import React, { useState } from "react";
import { Product, useProductStore } from "../../hooks/useProductStore";
import Modal from "../Shared/Modal";
import { countProducts, fetchProducts } from "@/utilities/graphql";

type ProductTableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditProduct: (product: any) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ onEditProduct }) => {
  const { deleteProduct, isLoading } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalProducts = countProducts();
  const totalPages = Math.ceil(totalProducts / pageSize);

  const currentProducts = fetchProducts(currentPage, pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="overflow-x-auto w-full flex flex-col m-auto">
      <table className="w-full lg:w-[80%] border-collapse border border-gray-200 mx-auto rounded-[12px]">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Product ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">ETA</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-100 h-[60px] cursor-pointer"
              onClick={() => handleRowClick(product)}
            >
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">{product.description}</td>
              <td className="border border-gray-300 p-2 capitalize">{product.status}</td>
              <td className="border border-gray-300 p-2">
                {new Date(product.eta * 1000).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onEditProduct(product);
                  }}
                  className="btn btn-blue mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    deleteProduct(product.id);
                  }}
                  className="btn btn-red"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-6 mr-[10%] items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md transition duration-200`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md transition duration-200`}
        >
          Next
        </button>
      </div>
      <Modal isOpen={!!selectedProduct} onClose={closeModal}>
  {selectedProduct && (
    <div className=" p-6 max-w-lg mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-center text-[#a05aff] mb-6">Product Details</h2>
      <div className="space-y-4">
        {[
          { label: 'Product ID', value: selectedProduct.id },
          { label: 'Title', value: selectedProduct.title },
          { label: 'Description', value: selectedProduct.description },
          { label: 'ETA', value: new Date(selectedProduct.eta * 1000).toLocaleString() },
          { label: 'Status', value: selectedProduct.status },
          { label: 'Recipient', value: selectedProduct.recipient },
          { label: 'Recipient Phone', value: selectedProduct.recipientPhone },
          { label: 'Origin', value: selectedProduct.origin },
          { label: 'Destination', value: selectedProduct.destination },
          { label: 'Packages', value: selectedProduct.packages.length },
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className=" font-semibold">{item.label}:</p>
            <p className="font-normal">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-[18px] font-semibold mb-2">Package Details:</p>
        <div className="space-y-4">
          {selectedProduct.packages.map((packageItem, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm">
              <p className="font-semibold">Package Name: <span className="font-normal">{packageItem.name}</span></p>
              <p className="font-semibold">Package Weight: <span className="font-normal">{packageItem.weight} {packageItem.weightUnit}</span></p>
              <p className="font-semibold">Package Quantity: <span className="font-normal">{packageItem.quantity} {packageItem.quantityUnit}</span></p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-[#a05aff] text-white rounded-lg shadow-md hover:bg-[#8c4bd9] transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>

    </div>
  );
};

export default ProductTable;
