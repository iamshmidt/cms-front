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
      className="lg:mx-6 flex lg:items-center space-x-4 lg:space-x-6 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-4 sm:mx-2 border-b"
    >
      <div className="lg:block sm:hidden">
      <Select onValueChange={onChange} >
        <SelectTrigger className="w-[180px] border-none text-lg focus:none focus:outline-none">
          <SelectValue placeholder="Collections" />
        </SelectTrigger>
        <SelectContent>
          {routes.map((route) => (
            <SelectItem
              key={route.href}
              value={route.href}
            >
              <Link
                href={route.href}
                onClick={() => console.log('Link clicked', route.href)}
                className={cn('text-lg font-medium transition-colors  hover:text-black', 'text-black')}
              >
                {route.label}
              </Link>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>

      {/* mobile */}
      <Link
        href='/'
        className={cn(
          'text-lg lg:hidden sm:block  font-medium transition-colors hover:text-black',
          isActive('/') ? 'text-black' : 'text-neutral-500'
        )}
      >
        Home
      </Link>
      <div className="lg:hidden sm:block text-lg text-neutral-500 font-medium ">
  Collections
</div>
      {routes.map((route) => (
              <Link
              key={route.href}
                href={route.href}
                onClick={() => console.log('Link clicked', route.href)}
                className={cn('sm:block lg:hidden text-lg font-medium  pl-4 transition-colors hover:text-black',route.active? 'hover:text-black':'text-neutral-500')}
              >
                {route.label}
              </Link>
          ))}
      {/* <div className="sm:block lg:hidden flex flex-col">
      {routes.map((route) => (
         <div className="text-lg font-medium transition-colors hover:text-black text-neutral-500 pt;2">
              <Link
              key={route.href}
                href={route.href}
                onClick={() => console.log('Link clicked', route.href)}
                className={cn('text-lg font-medium transition-colors',route.active? 'hover:text-black':'text-neutral-500')}
              >
                {route.label}
              </Link>
              </div>
          ))}
       </div> */}
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