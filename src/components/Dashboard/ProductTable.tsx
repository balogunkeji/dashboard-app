import React, { useState } from "react";
import { Product, useProductStore } from "../../hooks/useProductStore";
import Modal from "../Shared/Modal";
import Loader from "../Shared/Loader";

const PAGE_SIZE = 8;

type ProductTableProps = {
  products: Product[];
  onEditProduct: (product: Product) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, onEditProduct }) => {
  const { deleteProduct, isLoading } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const currentProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (direction: "next" | "previous") => {
    setCurrentPage((prev) =>
      direction === "next" && prev < totalPages
        ? prev + 1
        : direction === "previous" && prev > 1
          ? prev - 1
          : prev
    );
  };

  const closeModal = () => setSelectedProduct(null);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto border border-[#f9f9f] rounded-lg w-full mt-6 px-[2px]">
        <table className="table-auto w-full border-collapse border border-[#f9f9f] rounded-lg overflow-hidden">
          <thead className="bg-gray-100 h-[50px]">
            <tr>
              {["Product ID", "Title", "Description", "Status", "ETA", "Actions"].map((header) => (
                <th key={header} className="p-2 border border-[#f5f5f5] text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`cursor-pointer ${index % 2 ? "bg-[#f5f5f5]" : "bg-white"} `}
                onClick={() => setSelectedProduct(product)}
              >
                {[
                  product.id,
                  product.title,
                  product.description,
                  product.status,
                  new Date(product.eta * 1000).toLocaleString(),
                ].map((value, i) => (
                  <td key={i} className="p-2 border border-[#f5f5f5] text-sm text-center h-[50px]">
                    {value}
                  </td>
                ))}
                <td className="p-2 flex justify-center w-full gap-3 h-[50px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProduct(product);
                    }}
                    className="px-3 py-1 text-sm text-white w-full bg-[#ccbce3] max-w-[100px] rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product.id);
                    }}
                    className="px-3 py-1 text-sm text-white w-full bg-[#b48c8d] max-w-[100px] rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-4 gap-4">
        <button
          onClick={() => handlePageChange("previous")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          Next
        </button>
      </div>
      <Modal isOpen={!!selectedProduct} onClose={closeModal}>
        {selectedProduct && (
          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Product Details</h2>
            <div>
              {[
                { label: "Product ID", value: selectedProduct.id },
                { label: "Title", value: selectedProduct.title },
                { label: "Description", value: selectedProduct.description },
                { label: "ETA", value: new Date(selectedProduct.eta * 1000).toLocaleString() },
                { label: "Status", value: selectedProduct.status },
                { label: "Origin", value: selectedProduct.origin },
                { label: "Destination", value: selectedProduct.destination },
                { label: "Recipient", value: selectedProduct.recipient },
                { label: "Recipient Phone", value: selectedProduct.recipientPhone },
                { label: "Packages", value: selectedProduct.packages.length },
              ].map((item, i) => (
                <div key={i} className="flex justify-between space-y-2">
                  <span className="font-medium">{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col justify-center">
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
                  className="px-4 py-2 w-[200px] text-white bg-purple-600 rounded hover:bg-purple-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;
