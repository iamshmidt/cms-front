"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import Info from "@/components/info";
import { fetchAndUpdateProducts } from "@/hooks/update-products";

const CartPage = () => {

    
    const favorites = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const intervalId = setInterval(() => {
            fetchAndUpdateProducts();
        }, 60000); // Update every minute, adjust as needed

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Ensure the component renders null on the server (for SSR)
    if (!isMounted) return null;
    


    return ( 
        <div className="bg-white">
           <Container>
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                    <div className="lg:col-span-7">
                        {favorites.wishlist.length === 0 && <p className="text-neutral-500">Wishlist is empty</p>}
                        <ul>
                            {favorites.wishlist.map((item) => (
                                <CartItem key={item.id} data={item}></CartItem>
                            ))}
                        </ul>
                    </div>

                    {/* <Summary></Summary> */}
                </div>
            </div>
           </Container>
        </div>
     );
}
 
export default CartPage;