'use client'
import getProduct from '@/actions/get-product';
import { ProductStorage, Product } from '@/types';
import React, { use, useEffect, useState } from 'react'
import CartItem from './cart-item';
interface ProductStorageProps {
    data: ProductStorage;
}

const storageItems:React.FC<ProductStorageProps> =  ({
    data
}) => {
    console.log(data.id)
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(data.id);
            setProduct(fetchedProduct);
            console.log(fetchedProduct)
        };

        fetchProduct();
    }, []);
    // const product = await getProduct(data.id);
    // console.log(product)
  return (
    <div>
        <ul>
        {/* <CartItem key={item.id} data={item}></CartItem> */}
                            {/* {favorites.wishlist.map((item) => (
                                <CartItem key={item.id} data={item}></CartItem>
                            ))} */}
                            {product && <CartItem key={product.id} data={product}></CartItem>}
                        </ul>
    </div>
  )
}

export default storageItems
