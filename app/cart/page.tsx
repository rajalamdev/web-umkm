"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/useCart";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const handleCheckout = () => {
    // Implement your checkout logic here
    toast.success("Proceeding to checkout...");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-foregroundSecondary">
          Add some items to your cart to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-32">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 border rounded-lg max-h-max">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-8 items-center bg-card p-4 rounded-lg justify-between flex-wrap"
            >
              <div className="flex  items-center gap-8">
                <div className="relative h-24 w-24 bg-[#F6F6F6] rounded-md overflow-hidden ">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Food Name */}
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">{item.title}</h3>
                  </div>

                  <p className="text-foregroundSecondary">{item.subCategory}</p>
                </div>
              </div>

              <div className="flex gap-10 flex-wrap">
                {/* Food Cost */}
                <div>
                  <h3 className="text-foregroundSecondary text-sm">Cost</h3>
                  <p className="text-accent font-semibold">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>

                {/*  quantity */}
                <div>
                  <h3 className="text-foregroundSecondary text-sm">Amount</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus size={12} />
                    </Button>
                  </div>
                </div>

                {/* sub total item */}
                <div>
                  <h3 className="text-foregroundSecondary text-sm">Subtotal</h3>
                  <p className="text-accent font-semibold">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* remove item */}
              <Button
                variant="outline"
                className="rounded-full py-5 px-5"
                onClick={() => {
                  removeItem(item.id);
                  toast.success("Item removed from cart");
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-card h-fit">
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>

          <div className="border rounded-2xl p-6">
            <div className="space-y-2">
                {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                    <span>
                    {item.title} × {item.quantity}
                    </span>
                    <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
                ))}
            </div>

            <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>Rp {getTotalPrice().toLocaleString()}</span>
                </div>
            </div>

            <Button
                className="w-full mt-6 bg-accent hover:bg-accent/80 rounded-full"
                onClick={handleCheckout}
            >
                Checkout now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
