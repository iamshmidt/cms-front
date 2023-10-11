"use client"

import { useEffect, useState } from "react";
import Button from "./ui/button";
import { Heart, ShoppingBag} from "lucide-react"
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    const cart = useCart();
    
    if(!isMounted) return null;

    return ( 
        <div className="lg:ml-auto sm:ml-unset flex items-center gap-x-4">
            <Button onClick={()=> router.push("/favorites")} className="flex items-center rounded-full bg-black px-4 py-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm  text-center ">
            {/* <Button onClick={()=> router.push("/favorites")} className="flex items-center rounded-full bg-black px-4 py-2"> */}
            <Heart size={20} color="white"></Heart>
            <span className="ml-2 text-sm font-medium text-white">
                {cart.wishlist.length}
            </span>
            </Button>
            <Button onClick={()=> router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium  text-sm  text-center mr-2">
            <ShoppingBag size={20} color="white"></ShoppingBag>
            <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
            </span>
            </Button>
        </div>
     );
}
 
export default NavbarActions;