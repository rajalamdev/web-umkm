"use client"

import { useCart } from "@/lib/store/useCart"
import { IoBagOutline } from "react-icons/io5"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CartIcon() {
  const cart = useCart()
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Update whenever cart items change
    setItemCount(cart.getTotalItems())
  }, [cart.items])

  return (
    <Link href="/cart">
        <div className='w-10 h-10 rounded-full border-white border grid place-items-center cursor-pointer relative'>
            <div className='w-[22px] h-[22px] grid place-items-center rounded-full bg-red-500 -right-1 -top-1 absolute'>
                    <span className='text-white text-[9px] font-medium'>
                        {itemCount}
                    </span>
            </div>
            <IoBagOutline size={20} />
        </div>
    </Link>
  )
} 