"use client";
import CategoryCard from "@/components/CategoryCard";
import FoodCard from "@/components/FoodCard";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { LucideCrown, LucidePlayCircle } from "lucide-react";
import Image from "next/image";
import {
  FaBell,
  FaCube,
  FaPlay,
  FaPlayCircle,
  FaWineGlass,
} from "react-icons/fa";
import { FaBurger, FaShirt } from "react-icons/fa6";
import {
  products,
  getFeaturedProducts,
  getFeaturedNonFoodProducts,
  getFeaturedFoodAndBeverages,
  productCategories,
} from "@/lib/data/products";
import { useEffect, useState } from "react";

type Category = {
  slug: string;
  name: string;
  icon: string;
  childs: { slug: string; name: string; description: string | null }[];
};

export default function Home() {
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

  // Featured products section
  const featuredNonFoodProducts = getFeaturedNonFoodProducts();
  const featuredFoodProducts = getFeaturedFoodAndBeverages();

  return (
    <div>
      {/* hero section */}
      <section className="h-screen">
        <div className="container mx-auto h-full">
          <div className="items-center lg:flex h-full pt-32 lg:pt-0">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <div className="flex gap-2 items-center bg-white rounded-full py-2 px-4 max-w-max font-semibold mb-6">
                  <LucideCrown />
                  <p className="text-sm sm:text-base">
                    Harga Hemat Produk Berkualitas
                  </p>
                </div>
                <h1 className="text-3xl font-bold lg:text-5xl">
                  Selamat Datang di For UMKM
                </h1>
                <p className="mt-3 text-foregroundSecondary leading-8">
                  Website UMKM untuk menampung usaha-usaha milik masyarakat,
                  dengan transaksi langsung ke penjual, namun penjual diawasi
                  oleh pihak admin untuk memastikan keaslian usahanya.
                </p>
                <Button
                  asChild
                  className="mt-14 bg-accent rounded-full py-7 px-6"
                >
                  <p>Tambahkan ke Keranjang</p>
                </Button>
              </div>
            </div>

            <div className="flex justify-start  lg:justify-end w-full mt-6 lg:mt-0 lg:w-1/2 items-center">
              <Image
                src={"/image/hero.png"}
                width={500}
                height={500}
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* featured food section */}
      <section className="container mx-auto mt-20">
        <div className="flex justify-between flex-wrap gap-2">
          <h2 className="text-xl font-bold">
            Piihan Teratas Makanan Berkualitas
          </h2>
          <Button variant={"outline"} className="rounded-full py-6 px-6">
            <p className="font-semibold">Jelajahi Semua</p>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
          {featuredFoodProducts.map((food, index) => (
            <FoodCard
              key={food.id}
              id={food.id}
              image={food.image}
              title={food.title}
              category={food.category}
              price={food.price}
              isPopular={food.isPopular}
              subCategory={food.subCategory}
              description={food.description}
            />
          ))}
        </div>
      </section>

      {/* Banner support UMKM section */}
      <section className="container mx-auto my-20">
        <div className="bg-[#FA8066] relative rounded-2xl overflow-hidden w-full  shadow-lg">
          <div>
            <div className="absolute left-0 bottom-0 z-10">
              <img
                src="image/transaction-vector.png"
                alt="transaction vector image"
              />
            </div>
            <div className="absolute bottom-0 left-0">
              <img src="/image/red-rectangle.png" alt="red rectangle image" />
            </div>
            <div className="absolute top-0 right-0">
              <img src="/image/white-rectangle.png" alt="red rectangle image" />
            </div>
          </div>
          <div className="relative z-10 w-full flex flex-col items-end px-8 py-10 lg:max-w-[400px] lg:ml-auto">
            <div>
              <p className="text-accent font-bold text-3xl">
                Dukung UMKM Lokal!
              </p>
              <p className="text-accent font-semibold text-base mt-2">
                Beli Produk Asli Indonesia, Dukung Perekonomian Kita!
              </p>
              <p className="text-accent text-xs mt-2">
                "Belanja dari UMKM berarti Anda membantu pengusaha kecil tumbuh
                dan berkembang. Temukan produk terbaik dengan kualitas luar
                biasa langsung dari tangan ahli lokal”
              </p>
            </div>
            <div className="flex gap-4 mt-4 flex-wrap">
              <Button
                variant={"outline"}
                size={"sm"}
                className="rounded-full border-accent hover:bg-white bg-white py-5 px-6"
              >
                <p className="text-sm text-accent">Lihat Produk</p>
                <LucidePlayCircle className="text-accent" />
              </Button>
              <Button
                size={"sm"}
                className="rounded-full bg-accent hover:bg-accent py-5 px-6"
              >
                <p className="text-sm">Gabung UMKM</p>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* category section */}
      <section className="container mx-auto mt-20">
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
      </section>

      {/* featured products section */}
      <section className="container mx-auto my-20">
        <h2 className="text-2xl font-extrabold text-center">
          Rayakan Musim Panas Ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
          {featuredNonFoodProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              // price={product.price}
              // isPopular={product.isPopular}
              // subCategory={product.subCategory}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
