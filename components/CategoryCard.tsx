import React from "react";
import { IconType } from "react-icons";

interface CategoryCardProps {
  iconUrl: string;
  name: string;
  productCount: number;
  isActive?: boolean;
}

export default function CategoryCard({
  iconUrl,
  name,
  productCount,
  isActive,
}: CategoryCardProps) {
  return (
    <div
      className={`border ${
        isActive ? "border-accent" : ""
      } rounded-2xl py-6 px-4 flex gap-4 items-center cursor-pointer`}
    >
      <div className="bg-accent rounded-full w-12 h-12 grid place-items-center">
        <img src={iconUrl} alt={name} className="w-8 h-8" />
      </div>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-foregroundSecondary text-sm">
          {productCount} produk
        </p>
      </div>
    </div>
  );
}
