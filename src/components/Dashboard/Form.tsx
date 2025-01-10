/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { Product, useProductStore } from "../../hooks/useProductStore";
import Modal from "../Shared/Modal";
// import { formatUnixDate } from "@/utilities/formateDate";

type ProductFormProps = {
  onClose: () => void;
  existingProduct: Product | null;
};

const statusOptions = ["pending", "delivered", "cancelled"];
const defaultPackage = {
  name: "",
  weight: 0,
  weightUnit: "kg",
  quantity: 0,
  quantityUnit: "pcs",
};

const Input = ({ label, type = "text", value, onChange, ...props }: any) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className='block w-full rounded-md border-gray-300 border focus:ring-transparent focus:border-[#a05aff] sm:text-sm px-4 h-10'
    {...props}
    placeholder={label}
  />
);

const ProductForm: React.FC<ProductFormProps> = ({
  onClose,
  existingProduct,
}) => {
  const { addProduct, updateProduct } = useProductStore();
  const [formState, setFormState] = useState<Product>(
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
      packages: [defaultPackage],
    }
  );

  const weightOptions = ["kg", "lbs"];
  const weightOptions = ["pcs", "boxes"];

  const handleInputChange = (field: string, value: any, index?: number) => {
    if (index !== undefined) {
      const updatedPackages = formState.packages.map((pkg, i) =>
        i === index ? { ...pkg, [field]: value } : pkg
      );
      setFormState((prev) => ({ ...prev, packages: updatedPackages }));
    } else {
      setFormState((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateForm = () => {
    const {
      title,
      recipient,
      recipientPhone,
      description,
      origin,
      destination,
      eta,
      packages,
    } = formState;
    if (
      !title ||
      !recipient ||
      !recipientPhone ||
      !description ||
      !origin ||
      !destination ||
      !eta
    )
      return false;
    return packages.every(
      (pkg) => pkg.name && pkg.weight > 0 && pkg.quantity > 0
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) return alert("Please fill all required fields.");
    const product = { ...formState };
    existingProduct
      ? updateProduct(existingProduct.id, product)
      : addProduct(product);
    onClose();
  };

  const handleAddPackage = () =>
    setFormState((prev) => ({
      ...prev,
      packages: [...prev.packages, defaultPackage],
    }));

  const handleRemovePackage = (index: number) =>
    setFormState((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));

  return (
    <Modal isOpen onClose={onClose}>
      <div className='p-6 rounded-lg w-full'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>
          {existingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <form className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {[
              { label: "Title", field: "title" },
              { label: "Recipient", field: "recipient" },
              { label: "Recipient Phone", field: "recipientPhone" },
              { label: "Description", field: "description" },
              { label: "Origin", field: "origin" },
              { label: "Destination", field: "destination" },
            ].map(({ label, field }) => (
              <Input
                key={field}
                label={label}
                value={(formState as any)[field]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(field, e.target.value)
                }
              />
            ))}

            <Input
              type='datetime-local'
              label='ETA'
              value={
                formState.eta
                  ? new Date(
                      new Date(formState.eta * 1000).getTime() -
                        new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(
                  "eta",
                  new Date(e.target.value).getTime() / 1000
                )
              }
              min={new Date(
                new Date().getTime() - new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .slice(0, 16)}
            />

            <select
              value={formState.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className='block w-full rounded-md border-gray-300 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 h-10'
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className='font-bold text-lg text-gray-700 mb-2'>Packages</h3>
            {formState.packages.map((pkg, index) => (
              <div
                key={index}
                className='flex flex-wrap sm:flex-nowrap gap-4 items-start sm:items-center mb-2'
              >
                <Input
                  key='name'
                  label='name'
                  type='text'
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(pkg as any)["name"]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("name", e.target.value, index)
                  }
                />
                <Input
                  key='weight'
                  label='weight'
                  type='text'
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(pkg as any)["weight"]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("weight", e.target.value, index)
                  }
                />
                <select
                  key={"weightUnit"}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(pkg as any)["weightUnit"]}
                  onChange={(e) =>
                    handleInputChange("weightUnit", e.target.value, index)
                  }
                  className='block w-full rounded-md border-gray-300 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 h-10'
                >
                  {weightOptions.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <Input
                  key='quantity'
                  label='quantity'
                  type='text'
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(pkg as any)["quantity"]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("quantity", e.target.value, index)
                  }
                />
                <select
                  key={"quantityUnit"}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(pkg as any)["quantityUnit"]}
                  onChange={(e) =>
                    handleInputChange("quantityUnit", e.target.value, index)
                  }
                  className='block w-full rounded-md border-gray-300 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 h-10'
                >
                  {weightOptions.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>

                {["weightUnit", "quantityUnit"].map((field) => {
                  const options =
                    field === "weightUnit" ? ["kg", "lbs"] : ["pcs", "boxes"];
                  return (
                    <select
                      key={field}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      value={(pkg as any)[field]}
                      onChange={(e) =>
                        handleInputChange(field, e.target.value, index)
                      }
                      className='block w-full rounded-md border-gray-300 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 h-10'
                    >
                      {options.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  );
                })}

                {formState.packages.length > 1 && (
                  <button
                    type='button'
                    onClick={() => handleRemovePackage(index)}
                    className='text-red-500 hover:text-red-700'
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type='button'
              onClick={handleAddPackage}
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            >
              Add Package
            </button>
          </div>

          <div className='flex justify-center gap-4'>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={!validateForm()}
              className='px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white'
            >
              Save
            </button>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white'
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
