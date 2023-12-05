import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import MobileNav from "./mobile-nav";
import Image from "next/image";
import DesktopNav from "./desktop-nav";
import { Search } from "lucide-react";
import SearchCard from "@/components/ui/search-card";
import getProducts from "@/actions/get-products";


const Navbar = async () => {
  const categories = await getCategories();
  const products = await getProducts({});

  
  return (
    <div className="border-b fixed top-0 h-16 w-full z-30 bg-zinc-50">

      {/* <Container> */}

      <div className="shadow-md border-b  bg-zinc-50 relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between my-1">

        <div className="max-w-sm  py-2">
          <Link href="/" legacyBehavior>
            <a className="flex justify-center items-center">
              <Image src="/4.png" alt="Company Logo" width={80} height={80} className="object-cover object-center" />
            </a>
          </Link>
        </div>
        {/* mobile menu */}

        <div className="hidden lg:block w-full">
          <div className="flex justify-between w-full">
            <DesktopNav data={categories} />
            <div className="flex">
              <div className=""><SearchCard data={products}></SearchCard></div>
              <NavbarActions />
            </div>
          </div>
        </div>


        {/* desktop menu */}
        <div className="lg:hidden flex ">
          <NavbarActions />
          <MobileNav>
            <MainNav data={categories} />
          </MobileNav>
        </div>

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