'use client'
import getProduct from '@/actions/get-product';
import { ProductStorage, Product } from '@/types';
import React, { use, useEffect, useState } from 'react'
import CartItem from './cart-item';
import { useFetchProduct } from '@/actions/fetchSingleProducts';
interface ProductStorageProps {
    data: ProductStorage;
}

const storageItems: React.FC<ProductStorageProps> = ({
    data
}) => {
    const { product, isLoading } = useFetchProduct(data.id);

    return (
        <div>
            <ul>
                {product && <CartItem key={product.id} data={product}></CartItem>}
            </ul>
        </div>
    )
}

export default storageItems
