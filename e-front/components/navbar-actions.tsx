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
            <Button onClick={()=> router.push("/favorites")} className="flex items-center rounded-full bg-black px-4 py-2">
            <Heart size={20} color="white"></Heart>
            <span className="ml-2 text-sm font-medium text-white">
                {cart.wishlist.length}
            </span>
            </Button>
            <Button onClick={()=> router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
            <ShoppingBag size={20} color="white"></ShoppingBag>
            <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
            </span>
            </Button>
        </div>
     );
}
 
export default NavbarActions;