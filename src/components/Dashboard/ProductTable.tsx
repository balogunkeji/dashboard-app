import React, { useState } from "react";
import { Product, useProductStore } from "../../hooks/useProductStore";
import Modal from "../Shared/Modal";
import { countProducts, fetchProducts } from "@/utilities/graphql";
import Loader from "../Shared/Loader";

type ProductTableProps = {
  onEditProduct: (product: Product) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ onEditProduct }) => {
  const { deleteProduct, isLoading } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
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
    return <Loader />;
  }

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="overflow-x-auto lg:w-[calc(100%-300px)] flex flex-col lg:ml-[300px] no-scrollbar">
      <div className="border border-gray-200 rounded-[20px] w-full max-w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 h-[60px]">
              <th className="border border-[#f5f5f5] p-2 text-xs md:text-sm first:rounded-tl-xl last:rounded-tr-xl">
                Product ID
              </th>
              <th className="border border-[#f5f5f5] p-2 text-xs md:text-sm">Title</th>
              <th className="border border-[#f5f5f5] p-2 text-xs md:text-sm">Description</th>
              <th className="border border-[#f5f5f5] p-2 text-xs md:text-sm">Status</th>
              <th className="border border-[#f5f5f5] p-2 text-xs md:text-sm">ETA</th>
              <th className="border border-[#f5f5f5] p-2 text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`hover:bg-gray-100 h-[60px] cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"
                }`}
                onClick={() => handleRowClick(product)}
              >
                <td className="border border-[#f5f5f5] p-2 text-xs md:text-sm">{product.id}</td>
                <td className="border border-[#f5f5f5] p-2 text-xs md:text-sm">{product.title}</td>
                <td className="border border-[#f5f5f5] p-2 text-xs md:text-sm">{product.description}</td>
                <td className="border border-[#f5f5f5] p-2 text-xs md:text-sm capitalize">
                  {product.status}
                </td>
                <td className="border border-[#f5f5f5] p-2 text-xs md:text-sm">
                  {new Date(product.eta * 1000).toLocaleString()}
                </td>
                <td className="border border-[#f5f5f5] p-2 text-xs md:text-sm space-y-1 flex flex-wrap lg:flex-nowrap justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProduct(product);
                    }}
                    className="bg-[#d1c7e0] text-white w-full max-w-[100px] px-4 py-2 rounded-md text-xs md:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                    className="bg-[#b48c8d] text-white w-full max-w-[80px] px-4 py-2 rounded-md text-xs md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-6 px-4 md:px-8 gap-4 w-full lg:max-w-full">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md transition duration-200 text-xs md:text-sm`}
        >
          Previous
        </button>
        <span className="text-gray-700 text-xs md:text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md transition duration-200 text-xs md:text-sm`}
        >
          Next
        </button>
      </div>

      <Modal isOpen={!!selectedProduct} onClose={closeModal}>
        {selectedProduct && (
          <div className="p-6 max-w-full space-y-4">
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
                  <p className="font-semibold">{item.label}:</p>
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
            <div className="mt-6 flex justify-center w-full">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#a05aff] w-[200px] h-[50px] mt-4 text-white rounded-lg shadow-md hover:bg-[#8c4bd9] transition-colors duration-300"
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
