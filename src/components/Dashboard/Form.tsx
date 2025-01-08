import React, { useState } from "react";
import { useProductStore } from "../../hooks/useProductStore";

type Package = {
  name: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  quantityUnit: string;
};

type ProductFormProps = {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productToEdit?: any; // Pass the product if editing, otherwise undefined
};

const ProductForm: React.FC<ProductFormProps> = ({ onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useProductStore();

  const [formData, setFormData] = useState({
    id: productToEdit?.id || Math.random().toString(36).substr(2, 9),
    title: productToEdit?.title || "",
    recipient: productToEdit?.recipient || "",
    recipientPhone: productToEdit?.recipientPhone || "",
    description: productToEdit?.description || "",
    origin: productToEdit?.origin || "",
    destination: productToEdit?.destination || "",
    eta: productToEdit?.eta || 0,
    packages: productToEdit?.packages || [
      { name: "", weight: 0, weightUnit: "kg", quantity: 0, quantityUnit: "pcs" },
    ],
    status: productToEdit?.status || "pending",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePackageChange = (index: number, field: string, value: string | number) => {
    const updatedPackages = [...formData.packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setFormData({ ...formData, packages: updatedPackages });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { name: "", weight: 0, weightUnit: "kg", quantity: 0, quantityUnit: "pcs" },
      ],
    });
  };

  const handleSubmit = () => {
    if (productToEdit) {
      updateProduct(formData.id, formData);
    } else {
      addProduct(formData);
    }
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{productToEdit ? "Edit Product" : "Add Product"}</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="recipient"
          placeholder="Recipient"
          value={formData.recipient}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="recipientPhone"
          placeholder="Recipient Phone"
          value={formData.recipientPhone}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="datetime-local"
          name="eta"
          value={new Date(formData.eta * 1000).toISOString().slice(0, 16)}
          onChange={(e) =>
            setFormData({ ...formData, eta: Math.floor(new Date(e.target.value).getTime() / 1000) })
          }
          className="input"
        />
      </div>
      <h3 className="text-md font-semibold mt-4">Packages</h3>
      {formData.packages.map((pkg: Package, index: number) => (
        <div key={index} className="grid grid-cols-5 gap-2 mt-2">
          <input
            type="text"
            placeholder="Name"
            value={pkg.name}
            onChange={(e) => handlePackageChange(index, "name", e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Weight"
            value={pkg.weight}
            onChange={(e) => handlePackageChange(index, "weight", parseFloat(e.target.value))}
            className="input"
          />
          <select
            value={pkg.weightUnit}
            onChange={(e) => handlePackageChange(index, "weightUnit", e.target.value)}
            className="input"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={pkg.quantity}
            onChange={(e) => handlePackageChange(index, "quantity", parseFloat(e.target.value))}
            className="input"
          />
          <select
            value={pkg.quantityUnit}
            onChange={(e) => handlePackageChange(index, "quantityUnit", e.target.value)}
            className="input"
          >
            <option value="pcs">pcs</option>
            <option value="boxes">boxes</option>
          </select>
        </div>
      ))}
      <button onClick={addPackage} className="mt-4 btn">
        Add Package
      </button>
      <div className="mt-4 flex justify-end">
        <button onClick={handleSubmit} className="btn">
          {productToEdit ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
