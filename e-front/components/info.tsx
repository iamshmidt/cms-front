"use client"

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useState } from "react";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({
    data
}) => {
    console.log('data', data)
    const [amount, setAmount] = useState(1);
    const cart = useCart();

    const onAddToCart = () => {
        // cart.addItem(data);
        console.log('amount', amount)
        const productWithUpdatedQuantity = { ...data, amount };  // Update the product amount
        console.log('productWithUpdatedQuantity', productWithUpdatedQuantity)
        cart.addItem(productWithUpdatedQuantity);  // Add the product to the cart with updated amount
        // cart.updateAmount(productWithUpdatedQuantity);

    }

    const addQ = () => {
        setAmount(amount + 1);
    }

    const subtractQ = () => {
        if (amount > 0) {
            setAmount(amount - 1);
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price}></Currency>
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>
                        {data?.size?.name}
                    </div>

                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} >

                    </div>
                </div>
            </div>

            <div className="mt-10 flex items-center gap-x-3">
                {data.quantity == 0 ? <div className="text-red-500 mt-10 flex items-center gap-x-3">Out of stock</div> : null}
                <Button onClick={subtractQ} disabled={amount == 1 ? true : false} className="flex items-center gap-x-2">
                    <Minus size={20} className="ml-2" />
                </Button>
                <div className="">{amount}</div>
                <Button onClick={addQ} disabled={amount >= data.quantity ? true : false} className="flex items-center gap-x-2">
                    <Plus size={20} className="ml-2" />
                </Button>

            </div>
            <div className="text-red-500 mt-2 font-light text-s ">
                {data.quantity >= 3 ? null : (
                    <div className="">
                        {data.quantity === 1
                            ? `Only ${data.quantity} item available at the moment`
                            : `Only ${data.quantity} items available at the moment`}
                    </div>
                )}

            </div>


            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add to category
                    <ShoppingCart size={20} className="ml-2" />
                </Button>
            </div>
        </div>
    );
}

export default Info;