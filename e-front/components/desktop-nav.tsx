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

interface MainNavProps {
    data: Category[];
}

const DesktopNav: React.FC<MainNavProps> = ({
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
            className="lg:mx-6 flex lg:items-center space-x-4 lg:space-x-6 "
        >
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
                    <Link
                        href={'/category/all'}
                        className={cn(' text-lg font-medium  sm:pl-2 transition-colors hover:text-black', isActive('/category/all') ? 'hover:text-black' : 'text-neutral-500')}
                    >
                        View All
                    </Link>
                </SelectContent>
            </Select>

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

export default DesktopNav;