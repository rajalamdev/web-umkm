import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div>
      <AiOutlineLoading3Quarters
        className="animate-spin text-accent"
        size={50}
      />
    </div>
  );
}
