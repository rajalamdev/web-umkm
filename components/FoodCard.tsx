import Image from 'next/image'
import Link from 'next/link'

interface FoodCardProps {
  id: string
  image: string
  title: string
  description: string
  price: number
  category: string
  isPopular: boolean
  subCategory: string
}

export default function FoodCard({ id, image, title, description, price, subCategory }: FoodCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className='border rounded-3xl cursor-pointer'>
        <div className='flex justify-center py-4 max-h-[220px] h-[220px] overflow-hidden'>
          <img className='object-cover' src={image} alt={title} />
        </div>
        <div className='p-4'>
          <p className='font-bold'>{title}</p>
          <p className='text-foregroundSecondary text-sm'>{subCategory}</p>
          <p className='text-accent mt-2 font-semibold'>Rp. {price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  )
}
