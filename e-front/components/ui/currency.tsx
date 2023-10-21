"use client"

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

interface CurrencyProps {
    value?: string | number;
    priceWithDiscount: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
    value = 0,
    priceWithDiscount,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;


    return (<div className="font-semibold">
        {Number(priceWithDiscount) !== 0 && priceWithDiscount ? <div className="font-semibold">
            <span className='line-through text-gray-400 pr-2'> {formatter.format(Number(value))}</span>
            {formatter.format(Number(priceWithDiscount))}
        </div> : <span>{formatter.format(Number(value))}</span>}

    </div>
    );
}

export default Currency;