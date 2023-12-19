"use client";

import axios from "axios";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import getProducts from "@/actions/get-products";
import { Product } from "@/types";
import { useFetchProducts } from "@/actions/fetchProductsByIds";



const Summary = () => {
  const items = useCart((state) => state.items);
  
  const cart = useCart();
  // Always call this hook
  const itemIds = useMemo(() => cart.items.map(item => item.id), [cart.items]);
  const products = useFetchProducts(itemIds);
  const searchParams = useSearchParams();
  const removeAll = useCart((state) => state.removeAll);


  useEffect(() => {
    
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }

  }, [searchParams, removeAll]);


  const calculateCostPerItem = (quantity: number, price: number) => {
    return quantity * price;
  };

  const totalPrice = () => {
    let totalCost = 0;
    const items = useCart((state) => state.items);
    products.forEach(product => {
      const cartItem = items.find(item => item.id === product.id);

      if (cartItem) {
        const priceToUse = Number(product.priceAfterDiscount) !== 0 ? Number(product.priceAfterDiscount) : Number(product.price);
        totalCost += calculateCostPerItem(cartItem.amount, priceToUse);
      }
    });
    return totalCost;
  }

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      products: items
      // productIds: items.map((item) => item.id)
    });
    console.log('Checkout response:', response)

    window.location = response.data.url;
  }

  return (
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice()} />
        </div>
        <div className="text-gray-500 text-s">Tax is included</div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}

export default Summary;