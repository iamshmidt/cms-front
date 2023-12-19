"use-client"

import Image from "next/image";
import { toast } from "react-hot-toast";
import { Minus, Plus, X } from "lucide-react"
import { Product, ProductStorage } from "@/types";
import IcontButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";


interface CartItemProps {
    data: Product;
}
const CartItem: React.FC<CartItemProps> = ({
    data
}) => {

    const cart = useCart();
    const [amount, setAmount] = useState(1);




    const onRemove = () => {
        cart.removeItem(data.id);
    }


    useEffect(() => {
        // Find the item with the matching ID
        const item = cart.items.find(item => item.id === data.id);

        // If the item is found, update the amount state
        // If the item is found and its amount is greater than data.quantity, update the amount state

        if (item && data.quantity < item.amount) {
            setAmount(data.quantity);
        }
        // Otherwise, if the item is found, update the amount state to item's amount
        else if (item) {
            setAmount(item.amount);
        }
    }, [cart.items, data.id, data.quantity]);

    const onAddToCart = () => {
        // cart.addItem(data);
        const productWithUpdatedQuantity = { ...data, amount };
        cart.addItem(productWithUpdatedQuantity);
    }

    const addQ = () => {
        const newAmount = amount + 1;
        setAmount(newAmount);
        const productWithUpdatedQuantity = { ...data, amount: newAmount };
        cart.addItem(productWithUpdatedQuantity);
    }

    const subtractQ = () => {
        if (amount > 1) { // changed from 0 to 1, because you don't want to subtract when amount is already at its minimum (1)
            const newAmount = amount - 1;
            setAmount(newAmount);
            const productWithUpdatedQuantity = { ...data, amount: newAmount };
            cart.addItem(productWithUpdatedQuantity)
        }
    }



    return (<li className="flex py-6 border-b">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
            <Image fill src={data.images[0].url} alt="" className="object-cover object-center"></Image>
        </div>
        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="absolute z-10 right-0 top-0">
                <IcontButton onClick={onRemove} icon={<X size={15}></X>}></IcontButton>
            </div>
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-black">
                        {data.name}
                    </p>
                </div>

                <div className="mt-1 flex text-sm">
                    <p className="text-gray-300">{data.color.name}</p>
                    <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.size.name}</p>
                </div>
                <Currency value={data.price} priceWithDiscount={data?.priceAfterDiscount}></Currency>

                <div className="mt-10 flex-column items-center gap-x-3">
                    {data.quantity == 0 ? <div className="text-red-500 mt-5 flex items-center gap-x-3">Out of stock</div> :
                        <div className="flex gap-x-3 items-center">
                            <Button onClick={subtractQ} disabled={amount == 1 ? true : false} className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded bg-transparent flex items-center gap-x-2">
                                <Minus size={20} className="" />
                            </Button>
                            <div className="">{amount}</div>
                            <Button onClick={addQ} disabled={amount >= data.quantity ? true : false} className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded bg-transparent flex items-center gap-x-2 flex items-center gap-x-2">
                                <Plus size={20} />
                            </Button></div>}

                    <div className="text-red-500 mt-2 font-light text-xs ">
                        {data.quantity >= 3 || data.quantity === 0 ? null : (
                            <div className="">
                                {data.quantity === 1
                                    ? `Only ${data.quantity} item available at the moment`
                                    : `Only ${data.quantity} items available at the moment`}
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    </li>);
}

export default CartItem;