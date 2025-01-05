import React from 'react'
import { IconType } from 'react-icons'

interface CategoryCardProps {
  Icon: IconType
  name: string
  productCount: number
  isActive?: boolean
}

export default function CategoryCard({ Icon, name, productCount, isActive }: CategoryCardProps) {
  return (
    <div className={`border ${isActive && "border-accent"} rounded-2xl py-6 px-4 flex gap-4 items-center cursor-pointer`}>
        <div className='bg-accent rounded-full w-12 h-12 grid place-items-center'>
            <Icon size={20} color='white' />
        </div>
        <div>
            <p className='font-bold'>{name}</p>
            <p className='text-foregroundSecondary text-sm'>{productCount.toLocaleString()} produk</p>
        </div>
    </div>
  )
}
