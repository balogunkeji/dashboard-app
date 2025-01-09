import React, { useState } from "react";
import { Product, useProductStore } from "../../hooks/useProductStore";
import Modal from "../Shared/Modal";
import { formatUnixDate } from "@/utilities/formateDate";

type ProductFormProps = {
  onClose: () => void;
  existingProduct: Product | null;
};

const statusOptions = ["pending", "delivered", "cancelled"];
const inputClass =
  "block w-full rounded-md border-gray-300 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 h-10";

const ProductForm: React.FC<ProductFormProps> = ({
  onClose,
  existingProduct,
}) => {
  const { addProduct, updateProduct } = useProductStore();

  const [formState, setFormState] = useState(
    existingProduct || {
      id: crypto.randomUUID(),
      title: "",
      recipient: "",
      recipientPhone: "",
      description: "",
      origin: "",
      destination: "",
      eta: 0,
      status: "pending",
      packages: [
        {
          name: "",
          weight: 0,
          weightUnit: "kg",
          quantity: 0,
          quantityUnit: "pcs",
        },
      ],
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedPackages = [...formState.packages];
      updatedPackages[index] = {
        ...updatedPackages[index],
        [field]: e.target.value,
      };
      setFormState({ ...formState, packages: updatedPackages });
    } else {
      setFormState({ ...formState, [field]: e.target.value });
    }
  };

  const validateForm = () => {
    if (
      !formState.title ||
      !formState.recipient ||
      !formState.recipientPhone ||
      !formState.description ||
      !formState.origin ||
      !formState.destination ||
      !formState.eta
    ) {
      return false;
    }

    for (const pkg of formState.packages) {
      if (!pkg.name || pkg.weight <= 0 || pkg.quantity <= 0) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Please fill all the required fields before submitting.");
      return;
    }

    const product = {
      ...formState,
      eta: Math.floor(new Date(formState.eta).getTime() / 1000), // Convert to Unix time
    };

    if (existingProduct) {
      updateProduct(existingProduct.id, product);
    } else {
      addProduct(product);
    }

    onClose();
  };

  const handleAddPackage = () => {
    setFormState({
      ...formState,
      packages: [
        ...formState.packages,
        {
          name: "",
          weight: 0,
          weightUnit: "kg",
          quantity: 0,
          quantityUnit: "pcs",
        },
      ],
    });
  };

  const handleRemovePackage = (index: number) => {
    const updatedPackages = formState.packages.filter((_, i) => i !== index);
    setFormState({ ...formState, packages: updatedPackages });
  };

  const currentDateTime = formatUnixDate(Date.now() / 1000);

  return (
    <Modal isOpen onClose={onClose}>
      <div className='p-6 rounded-lg w-full'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>
          {existingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <form className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <input
              type='text'
              placeholder='Title'
              value={formState.title}
              onChange={(e) => handleInputChange(e, "title")}
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Recipient'
              value={formState.recipient}
              onChange={(e) => handleInputChange(e, "recipient")}
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Recipient Phone'
              value={formState.recipientPhone}
              onChange={(e) => handleInputChange(e, "recipientPhone")}
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Description'
              value={formState.description}
              onChange={(e) => handleInputChange(e, "description")}
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Origin'
              value={formState.origin}
              onChange={(e) => handleInputChange(e, "origin")}
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Destination'
              value={formState.destination}
              onChange={(e) => handleInputChange(e, "destination")}
              className={inputClass}
            />
            <input
              type='datetime-local'
              placeholder='ETA'
              value={
                formState.eta && formState.eta > 0
                  ? new Date(formState.eta * 1000).toISOString().slice(0, 16) 
                  : ""
              }
              onChange={(e) => {
                const isoString = e.target.value; 
                const timestamp = new Date(isoString).getTime() / 1000; 
                handleInputChange(
                  {
                    target: { value: timestamp },
                  } as unknown as React.ChangeEvent<HTMLInputElement>,
                  "eta"
                );
              }}
              className={inputClass}
              min={currentDateTime}
            />

            <select
              value={formState.status}
              onChange={(e) => handleInputChange(e, "status")}
              className={inputClass}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-gray-700'>Packages</h3>
            {formState.packages.map((pkg, index) => (
              <div
                key={index}
                className='flex flex-col sm:flex-row items-start sm:items-center gap-4'
              >
                <input
                  type='text'
                  placeholder='Name'
                  value={pkg.name}
                  onChange={(e) => handleInputChange(e, "name", index)}
                  className={inputClass}
                />
                <input
                  type='number'
                  placeholder='Weight'
                  value={pkg.weight}
                  onChange={(e) => handleInputChange(e, "weight", index)}
                  className={inputClass}
                />
                <select
                  value={pkg.weightUnit}
                  onChange={(e) => handleInputChange(e, "weightUnit", index)}
                  className={inputClass}
                >
                  <option value='kg'>kg</option>
                  <option value='lbs'>lbs</option>
                </select>
                <input
                  type='number'
                  placeholder='Quantity'
                  value={pkg.quantity}
                  onChange={(e) => handleInputChange(e, "quantity", index)}
                  className={inputClass}
                />
                <select
                  value={pkg.quantityUnit}
                  onChange={(e) => handleInputChange(e, "quantityUnit", index)}
                  className={inputClass}
                >
                  <option value='pcs'>pcs</option>
                  <option value='boxes'>boxes</option>
                </select>
                {formState.packages.length > 1 && (
                  <button
                    type='button'
                    onClick={() => handleRemovePackage(index)}
                    className='btn btn-red'
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type='button'
              onClick={handleAddPackage}
              className='btn btn-blue'
            >
              Add Package
            </button>
          </div>
          <div className='flex justify-center w-full gap-6'>
            <button
              type='button'
              onClick={handleSubmit}
              className='px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed'
              disabled={!validateForm()}
            >
              Save
            </button>

            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductForm;
