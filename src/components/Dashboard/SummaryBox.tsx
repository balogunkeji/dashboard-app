import { countProducts, productsByStatus } from "@/utilities/graphql";
import React from "react";

const SummaryBox = () => {
  const total = countProducts();
  const statusCounts = productsByStatus();

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4  gap-3">
      <div className="bg-[#d1c7e0] p-3 rounded-lg text-center shadow-md w-full mx-auto sm:max-w-full">
        <p className="text-white font-bold text-lg">Total</p>
        <p className="text-white font-medium text-md">{total}</p>
      </div>
      <div className="bg-[#b48c8d] p-3 rounded-lg text-center shadow-md w-full mx-auto sm:max-w-full">
        <p className="text-white font-bold text-lg">Pending</p>
        <p className="text-white font-medium text-md">{statusCounts.pending}</p>
      </div>
      <div className="bg-[#a6d0ca] p-3 rounded-lg text-center shadow-md w-full mx-auto sm:max-w-full">
        <p className="text-white font-bold text-lg">Delivered</p>
        <p className="text-white font-medium text-md">{statusCounts.delivered}</p>
      </div>
      <div className="bg-[#4bcbeb] p-3 rounded-lg text-center shadow-md w-full mx-auto sm:max-w-full">
        <p className="text-white font-bold text-lg">Cancelled</p>
        <p className="text-white font-medium text-md">{statusCounts.cancelled}</p>
      </div>
    </div>
  );
};

export default SummaryBox;
