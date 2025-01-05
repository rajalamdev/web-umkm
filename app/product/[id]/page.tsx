"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { use } from "react"
import { getProductById, getSimilarProducts } from "@/lib/data/products"
import { notFound } from "next/navigation"
import { IoHeartOutline, IoShareSocialOutline } from "react-icons/io5"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/lib/store/useCart"
import { toast } from "sonner"
import { FaArrowRight, FaChevronRight } from "react-icons/fa6"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
//   const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const resolvedParams = use(params)
  const product = getProductById(resolvedParams.id)
  const similarProducts = getSimilarProducts(resolvedParams.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
        id: product.id,
        image: product.image,
        title: product.title,
        category: product.category,
        subCategory: product.subCategory,
        price: product.price,
        description: product.description,
    })
    toast.success("Added to cart!")
  }

  return (
    <div className="container mx-auto py-32">
      {/* Product Section */}
      <section className="flex gap-2 items-center mb-4 ml-8">
        <p className="text-foregroundSecondary text-sm font-medium">{product.category}</p>
        <FaChevronRight size={12} className="text-foregroundSecondary" />
        <p className="font-medium text-sm">{product.title}</p>
      </section> 
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-[534px] w-full rounded-lg overflow-hidden bg-[#F6F6F6] grid place-items-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-2xl font-bold text-accent">Rp {product.price.toLocaleString()}</p>
            </div>
            <div className="cursor-pointer">
                <IoShareSocialOutline size={25} />
            </div>
          </div>
          
          <div className="mt-8 flex gap-2">
            <Button 
              className="px-20 bg-accent py-6 hover:bg-accent/80"
              onClick={handleAddToCart}
            >
                Add to cart
            </Button>
            <Button variant={"outline"} size={"icon"} className="py-6 px-6">
                <IoHeartOutline />
            </Button>
          </div>

          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
            <p className="text-foregroundSecondary">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          {/* <div className="flex items-center space-x-4">
            <p className="font-semibold">Jumlah:</p>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FaMinus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

          {/* Add to Cart Button */}
        </div>
      </section>

      {/* Recommed Product Section */}
      <section className="mt-20">
        <h2 className="text-xl font-bold">You might also like</h2>
        <p className="text-foregroundSecondary uppercase text-sm mt-2">similar products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
          {similarProducts.map((product) => (
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
      </section>
    </div>
  )
}
