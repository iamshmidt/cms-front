"use client";

import Link from "next/link"
import { redirect, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils"
import { Category } from "@/types";
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {

  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const onChange = (value: string) => {
    redirect(value);
  }

  return (
    <nav
      className=" flex  space-x-4  flex-col items-start space-y-4 mx-2 border-b"
    >

      <Link
        href='/'
        className={cn(
          'text-lg  sm:block  font-medium transition-colors hover:text-black',
          isActive('/') ? 'text-black' : 'text-neutral-500'
        )}
      >
        Home
      </Link>
      <div className=" sm:block text-lg text-neutral-500 font-medium ">
        Collections
      </div>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          onClick={() => console.log('Link clicked', route.href)}
          className={cn('sm:block  text-lg font-medium  pl-4 transition-colors hover:text-black', route.active ? 'hover:text-black' : 'text-neutral-500')}
        >
          {route.label}
        </Link>
      ))}
      <Link
        href='/our-story'
        className={cn(
          'text-lg font-medium transition-colors hover:text-black',
          isActive('/our-story') ? 'text-black' : 'text-neutral-500'
        )}
      >
        Our Story
      </Link>
      <Link
        href='/contact'
        className={cn(
          'text-lg font-medium transition-colors hover:text-black',
          isActive('/contact') ? 'text-black' : 'text-neutral-500'
        )}
      >
        Contact Us
      </Link>



    </nav>
  )
};

export default MainNav;