"use client"

import Button from "@/components/ui/button";
import NavbarActions from "@/components/navbar-actions";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconButton from "./ui/icon-button";
interface MobileNavProps {
    children: React.ReactNode
}
const MobileNav: React.FC<MobileNavProps> = ({
    children
}) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    return (
        <> 
        <Button onClick={onOpen} className=" bg-transparent flex items-center gap-x-2 lg:hidden">
           
            <Menu size={20} color="black"></Menu></Button>
            <Transition
      show={open}
      enter="transform transition ease-in-out duration-700"
      enterFrom="translate-x-full "
      enterTo="translate-x-0"
    
as="div"    >
            <Dialog  className="relative z-40 lg:hidden" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-50 shadow-xl" />
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    {/* <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"> */}
                        {/* Close Button */}
                        <div className="flex items-center justify-between px-4">
                        <NavbarActions />
                        <div><IconButton icon={<X size={20} />} onClick={onClose} className="ml-unset"></IconButton></div>
                            
                        </div>
                        {/* Render the filter */}
                        <div className="p-4">
                            {children}
                        </div>
                    </Dialog.Panel>

                </div>
            </Dialog>
            </Transition>
        </>
    );
}

export default MobileNav;