import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import MobileNav from "./mobile-nav";
import Image from "next/image";

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="border-b">
       
      {/* <Container> */}
      
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
         
            <p className="font-bold text-xl">STORE

            </p>
            <div className="max-w-2">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image  fill src="/4.png" alt="" className="object-cover object-center"></Image>
          </Link>
          </div>
          <MobileNav>
          <MainNav data={categories} />
          {/* <NavbarActions /> */}
          </MobileNav>
        </div>
       
        {/* Add mobile filter */}
        {/* <MobileFilters sizes={sizes} colors={colors}></MobileFilters> */}
       
          {/* <MainNav data={categories} />
          <NavbarActions /> */}
      {/* </Container> */}
   
      {/* <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container> */}
      
    </div>
  );
};
 
export default Navbar;