import React from 'react'
import Image from "next/image"
import { FaHeart } from "react-icons/fa"
import Link from "next/link"

interface ProductCardProps {
  id: string
  image: string
  title: string
  category: string
  subCategory: string
  price: number
  isPopular: boolean
}

export default function ProductCard({
  id,
  image,
  title,
  category,
  subCategory,
  price,
  isPopular
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group cursor-pointer">
        <div className='bg-[#F0F0F0] rounded-2xl max-h-[308px] h-[308px] overflow-hidden flex justify-center items-center relative'>
            <img src={image} alt={title} />
            {isPopular && (
              <div className='absolute w-40 bg-accent py-2 px-4 flex justify-center top-4 -right-10 rotate-45'>
                  <p className='text-white'>POPULER!</p>
              </div>
            )}
        </div>
        <div className='flex justify-between items-center py-4'>
            <div className='flex flex-col gap-1'>
                <p className='font-bold'>{title}</p>
                <p className='text-foregroundSecondary text-sm'>{subCategory}</p>
            </div>
            <div>
                <p className='text-accent font-semibold'>Rp. {price.toLocaleString()}</p>
            </div>
        </div>
      </div>
    </Link>
  )
}
