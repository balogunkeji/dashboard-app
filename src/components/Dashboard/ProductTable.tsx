import React from "react";
import { useProductStore } from "../../hooks/useProductStore";

type ProductTableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditProduct: (product: any) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ onEditProduct }) => {
  const { products, deleteProduct } = useProductStore();

  return (
    <table className="w-[90%] border-collapse border border-gray-200 mx-auto">
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
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border border-gray-300 p-2">{product.id}</td>
            <td className="border border-gray-300 p-2">{product.title}</td>
            <td className="border border-gray-300 p-2">{product.description}</td>
            <td className="border border-gray-300 p-2">{product.status}</td>
            <td className="border border-gray-300 p-2">
              {new Date(product.eta * 1000).toLocaleString()}
            </td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onEditProduct(product)}
                className="btn btn-blue mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="btn btn-red"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
