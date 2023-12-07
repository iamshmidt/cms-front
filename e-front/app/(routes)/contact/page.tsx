"use client";

import Contact from "@/components/contact";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

const ContactPage = () => {

    
    // const cart = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted) return null;

    return ( 
        <div className="bg-white">
           <Container>
            <div className="px-4 py-16 sm:px-6 lg:px-8">
          <Contact></Contact>
            </div>
           </Container>
        </div>
     );
}
 
export default ContactPage;