"use client";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { productCategories, products } from "@/lib/data/products";
import { FaBurger, FaCube, FaShirt, FaWineGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";

type Category = {
  slug: string;
  name: string;
  icon: string;
  childs: { slug: string; name: string; description: string | null }[];
};

export default function ProductsPage() {
  const [activeCat, setActiveCat] = useState("");
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data kategori:", data);
        setCategory(data.data || []);
      } else {
        console.error("Failed to fetch Category");
      }
    } catch (error) {
      console.error("Error while fetch category:", error);
    }
  }

  // Filter products based on active category
  const filteredProducts = activeCat
    ? products.filter((product) => product.category === activeCat)
    : products;

  return (
    <div className="container mx-auto py-32">
      <div className="mx-auto mb-20">
        <div className="flex justify-between flex-wrap gap-2">
          <h2 className="text-xl font-bold">
            Jelajahi Produk berdasarkan Kategori
          </h2>
          <Button variant={"outline"} className="rounded-full py-6 px-6">
            <p className="font-semibold">Jelajahi Semua</p>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
          {category.map((cat) => (
            <div
              key={cat.name}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCat(cat.name === activeCat ? "" : cat.name);
              }}
            >
              <CategoryCard
                iconUrl={cat.icon}
                name={cat.name}
                productCount={cat.childs.length}
                isActive={activeCat === cat.name}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            isPopular={product.isPopular}
            subCategory={product.subCategory}
          />
        ))}
      </div>
    </div>
  );
}
