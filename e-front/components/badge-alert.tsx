"use client";

import { Badge, BadgeProps } from "./ui/badge";


interface ProductAlertProps {
    title: string;
    description: string;
    variant: "sale" | "outOfStock";
}

const textMap: Record<ProductAlertProps["variant"], string> = {
    sale: "Public",
    outOfStock: "Out of stock",
};

const variantMap: Record<ProductAlertProps["variant"], BadgeProps["variant"]> = {
    sale: "secondary",
    outOfStock: "destructive",
};

const BadgeAlert:React.FC<ProductAlertProps> = ({
    title,
    description,
    variant,
}) => {
    return ( 
        <div>
             <Badge variant={variantMap[variant]}> {textMap[variant]}</Badge>
        </div>
     );
}
 
export default BadgeAlert;