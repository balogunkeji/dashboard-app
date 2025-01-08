import { countProducts, productsByStatus } from "@/utilities/graphql";
import React from "react";

const SummaryBox = () => {
  const total = countProducts();
  const statusCounts = productsByStatus();

  return (
    <div className="flex  gap-4 justify-center">
      <div className="bg-gray-100 p-4 rounded-lg">Total: {total}</div>
      <div className="bg-gray-100 p-4 rounded-lg">Pending: {statusCounts.pending}</div>
      <div className="bg-gray-100 p-4 rounded-lg">Delivered: {statusCounts.delivered}</div>
      <div className="bg-gray-100 p-4 rounded-lg">Cancelled: {statusCounts.cancelled}</div>
    </div>
  );
};

export default SummaryBox;
