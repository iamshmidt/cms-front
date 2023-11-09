"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import getProducts from "@/actions/get-products";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const updatePrices = useCart((state) => state.updatePrices);  
  const removeAll = useCart((state) => state.removeAll);


  useEffect(() => {
    const fetchAndUpdatePrices = async () => {
      try {
        const updatedProducts = await getProducts({});
        // updatePrices(updatedProducts);
        console.log('Updated cart items:', updatedProducts)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndUpdatePrices();
  }, []);


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
    items.forEach(item => {
        const priceToUse = Number(item.priceAfterDiscount) !== 0 ? Number(item.priceAfterDiscount) : Number(item.price);
        totalCost += calculateCostPerItem(item.amount, priceToUse);
    });
    return totalCost;
}

    const onCheckout = async () => {
      console.log('Checkout items:', items)
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
        </div>
        <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
          Checkout
        </Button>
      </div>
    );
  }

  export default Summary;